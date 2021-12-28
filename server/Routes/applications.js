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
  try {
    const { user } = req;
    const response = await ApplicationsModel.find({ userId: user.sub });
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", jwtCheck, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const application = await ApplicationsModel.findById(id);

    if (!application) return res.status(404).send("Application Not Found.");

    if (user.sub === application.userId) {
      await ApplicationsModel.findByIdAndDelete(id);
      return res.status(204).send("successfully deleted");
    }

    res.status(403).send("Request Failed");
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", jwtCheck, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const application = await ApplicationsModel.findById(id);

    if (!application) return res.status(404).send("Application not found.");

    if (
      user.sub === application.employerId ||
      user.sub === application.userId
    ) {
      await ApplicationsModel.findByIdAndUpdate(id, { status: false });
      return res.status(204).send("Successfully updated");
    }

    res.status(404).send("Request Failed.");
  } catch (error) {
    next(error);
  }
});

router.use(errors());
module.exports = router;
