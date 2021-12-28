const { celebrate, Joi, Segments, errors, next } = require("celebrate");
const fileUpload = require("express-fileupload");
Joi.objectId = require("joi-objectid")(Joi);
const { nanoid } = require("nanoid/async");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const fs = require("fs");

const ApplicationsModel = require("../Models/applications");
const ListingModel = require("../Models/listing");
const UsersModel = require("../Models/user");

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

const cvDeleteValidation = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.objectId(),
  }),
};

router.use(express.json());
router.use(cors());

router.use(
  fileUpload({
    limits: { fileSize: 20 * 1024 * 1024 },
  })
);

router.get("/", jwtCheck, async (req, res, next) => {
  try {
    const { user } = req;

    // User is an employer, return all applicants
    if (user.permissions.includes("read:applications")) {
      return res.send({
        data: await UsersModel.find({ userId: user.sub }),
        listings: await ListingModel.find({ employerId: user.sub }),
        applications: await ApplicationsModel.find({ employerId: user.sub }),
      });
    }

    // User is an employee, return all applictions
    res.send({
      data: await UsersModel.find({ userId: user.sub }),
      listings: await ListingModel.find({ employerId: user.sub }),
      applications: await ApplicationsModel.find({ userId: user.sub }),
    });
  } catch (error) {
    next(error);
  }
});

router.post("/upload", jwtCheck, async (req, res, next) => {
  try {
    const { user } = req;

    if (!req.files || Object.keys(req.files).length === 0) {
      const e = new Error("No files were uploaded.");
      return res.status(400).send({ msg: "nofiles" });
    }

    const id = await nanoid();
    const cv = req.files.file;
    const uploadPath = "uploads/" + id + ".pdf";

    if (cv.mimetype !== "application/pdf") {
      return res.status(400).send("Invalid filetype!");
    }

    // Check if the user has a cv uploaded already, if so overwrite it with the new one
    const userData = await UsersModel.find({ userId: user.sub });
    if (userData.length !== 0 && userData[0].cvId !== null) {
      const oldPath = `./uploads/${userData[0].cvId}.pdf`;
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    // Use the mv() method to place the file somewhere on your server
    cv.mv(uploadPath, async (err) => {
      if (err) next(err);

      await UsersModel.updateOne(
        { userId: user.sub },
        { cvId: id, originalName: cv.name },
        { upsert: true }
      );
      return res.status(201).send("CV uploaded!");
    });
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/cv",
  jwtCheck,
  celebrate(cvDeleteValidation),
  async (req, res, next) => {
    try {
      const { user } = req;

      const userData = await UsersModel.find({ userId: user.sub });
      const id = userData[0].cvId;

      const path = `./uploads/${id}.pdf`;
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);

        await UsersModel.updateOne(
          { userId: user.sub },
          { cvId: null, originalName: null }
        );
      }

      res.status(204).send("cvremoved");
    } catch (error) {
      next(error);
    }
  }
);

router.use(errors());
module.exports = router;
