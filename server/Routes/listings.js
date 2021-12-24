const { celebrate, Joi, errors, Segments, next } = require("celebrate");
Joi.objectId = require("joi-objectid")(Joi);

const { ObjectId } = require("mongoose").Types;

const express = require("express");
const router = express.Router();
const cors = require("cors");

const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const ApplicationsModel = require("../Models/applications");
const ListingsModel = require("../Models/listing");

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-8no50mo4.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://newcareer.co.nz",
  issuer: "https://dev-8no50mo4.us.auth0.com/",
  algorithms: ["RS256"],
});

const getListingValidationSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.objectId(),
  }),
};

const searchValidation = {
  [Segments.PARAMS]: Joi.object().keys({
    value: Joi.string().alphanum().min(3),
  }),
};

const newListingValidation = {
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(5).required(),
    description: Joi.string().min(200).required(),
    city: Joi.string().required(),
    closingDate: Joi.date().required(),
    positionType: Joi.string().required(),
    payRate: Joi.number(),
    payType: Joi.string(),
    employmentHours: Joi.number().min(1),
    id: Joi.objectId(),
  }),
};

router.use(cors());
router.use(express.json());

// Get all listings
router.get("/", async (req, res, next) => {
  try {
    ListingsModel.findRandom({}, {}, { limit: 80 }, (err, result) => {
      if (err) next(err);

      if (!result) return res.send({ msg: "No listings found!" });

      res.json(result);
    });
  } catch (error) {
    next(error);
  }
});

// Create a listings
router.post(
  "/",
  jwtCheck,
  celebrate(newListingValidation),
  async (req, res, next) => {
    const { body, user } = req;

    try {
      let listing = { ...body };
      listing.listingDate = new Date();

      const newListing = new ListingsModel({
        employerId: user.sub,
        ...listing,
      });

      const result = await newListing.save();
      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

// Update single listing
router.post(
  "/update",
  jwtCheck,
  celebrate(newListingValidation),
  async (req, res, next) => {
    const { body, user } = req;

    try {
      let listing = { ...body };
      listing.listingDate = new Date();
      delete listing.id;

      const query = {
        _id: body.id,
        employerId: user.sub,
      };

      await ListingsModel.updateOne(query, listing, { upsert: false });
      return res.status(204).send({ msg: "Listing Updated" });
    } catch (error) {
      next(error);
    }
  }
);

// Delete single listing
router.delete("/:id", jwtCheck, async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const listing = await ListingsModel.findById(id);
  if (listing.employerId === user.sub) {
    await ListingsModel.findByIdAndDelete(id);
    return res.send({ msg: "deleted successfully" });
  }

  res.status(401).send({ msg: "Not Authorized" });
});

// Search for listing/s
router.get(
  "/search/:value",
  celebrate(searchValidation),
  async (req, res, next) => {
    try {
      const { value } = req.params;
      const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
      const searchRgx = rgx(value);

      res.send(
        await ListingsModel.find({
          title: { $regex: searchRgx, $options: "i" },
        }).limit(80)
      );
    } catch (err) {
      next(err);
    }
  }
);

// Get listing by ID
router.get("/:id", celebrate(getListingValidationSchema), async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id))
      return res.status(400).send({ error: "Bad request" });

    const response = await ListingsModel.findById(id);

    if (!response)
      return res.status(404).send({ error: "Unable to find restaurant" });

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// Create new application for a listing
router.post("/apply/:id", jwtCheck, async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const { cvId, name, email, contact } = req.body;

  const listing = await ListingsModel.findById(id);

  const application = new ApplicationsModel({
    title: listing.title,
    userId: user.sub,
    listingId: id,
    cvId,
    name,
    email,
    contact,
  });

  try {
    await application.save();
    res.status(201).send({ msg: "Application Saved" });
  } catch (error) {
    next(error);
  }
});

router.use(errors());
module.exports = router;
