const { celebrate, Joi, errors, Segments, next } = require("celebrate");
Joi.objectId = require("joi-objectid")(Joi);

const { ObjectId } = require("mongoose").Types;

const express = require("express");
const router = express.Router();
const cors = require("cors");

const ApplicationsModel = require("../Models/applications");
const ListingsModel = require("../Models/listing");

const jwtAuthz = require("express-jwt-authz");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const checkPermissions = jwtAuthz(
  ["create:listing", "delete:listing", "update:listing"],
  {
    customScopeKey: "permissions",
  }
);

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
    value: Joi.string(),
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
    employmentHours: Joi.number().min(0),
    id: Joi.objectId(),
  }),
};

const validateApplication = {
  [Segments.BODY]: Joi.object().keys({
    cvId: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    contact: Joi.number().required(),
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
  checkPermissions,
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
router.patch(
  "/update",
  jwtCheck,
  checkPermissions,
  celebrate(newListingValidation),
  async (req, res, next) => {
    const { body, user } = req;

    try {
      let ModifiedListing = { ...body };
      listing.listingDate = new Date();

      const CurrentSavedListing = await ListingsModel.findById(listing.id);

      if (CurrentSavedListing.employerId !== user.sub) {
        const error = new Error("Failed to update listing");
        error.status = 401;
        next(error);
      } else if (CurrentSavedListing.editcount > 2) {
        // Users are allowed 3 edits
        const error = new Error(
          "Failed to update listing, No edits left. Delete, then create a new listing."
        );
        error.status = 304;
        next(error);
      }

      delete ModifiedListing.id;
      ModifiedListing.editCount++;

      const query = {
        _id: body.id,
        employerId: user.sub,
      };

      await ListingsModel.updateOne(query, ModifiedListing, { upsert: false });
      return res.status(204).send({ msg: "Listing Updated" });
    } catch (error) {
      next(error);
    }
  }
);

// Delete single listing
router.delete("/:id", jwtCheck, checkPermissions, async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const listing = await ListingsModel.findById(id);
  if (listing.employerId === user.sub) {
    await ApplicationsModel.updateMany({ listingId: id }, { status: false });
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
      const regEx = new RegExp(value, "i");

      res.send(
        await ListingsModel.find(
          {
            $or: [{ title: regEx }, { city: regEx }],
          },
          {},
          { limit: 80 }
        )
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
router.post(
  "/apply/:id",
  jwtCheck,
  celebrate(validateApplication),
  async (req, res, next) => {
    const { user } = req;
    const { id } = req.params;
    const { cvId, name, email, contact } = req.body;

    const listing = await ListingsModel.findById(id);

    const application = new ApplicationsModel({
      title: listing.title,
      userId: user.sub,
      listingId: id,
      employerId: listing.employerId,
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
  }
);

router.use(errors());
module.exports = router;
