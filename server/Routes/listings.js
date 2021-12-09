const { celebrate, Joi, errors, Segments, next } = require("celebrate");
Joi.objectId = require("joi-objectid")(Joi);

const { ObjectId } = require("mongoose").Types;

const express = require("express");
const router = express.Router();
const cors = require("cors");

const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

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

router.use(cors());

router.get("/", async (req, res, next) => {
  try {
    ListingsModel.findRandom({}, {}, { limit: 80 }, (err, result) => {
      if (err) next(err);
      res.json(result);
    });
  } catch (error) {
    next(error);
  }
});

router.get("/user", jwtCheck, async (req, res, next) => {
  try {
    const { user } = req;
    res.send(await ListingsModel.find({ userId: user.sub }));
  } catch (error) {
    next(error);
  }
});

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

router.use(errors());
module.exports = router;
