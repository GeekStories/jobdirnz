const { errors, next } = require("celebrate");
const express = require("express");
const router = express.Router();
const cors = require("cors");

const ApplicationsModel = require("../Models/applications");

const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

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

router.use(cors());

router.get("/", jwtCheck, async (req, res, next) => {
  const { user } = req;

  try {
    const response = await ApplicationsModel.find({ userId: user.sub });
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.use(errors());
module.exports = router;
