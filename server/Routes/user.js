const fileUpload = require("express-fileupload");
const { errors, next } = require("celebrate");
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

    const userData = {
      data: await UsersModel.find({ userId: user.sub }),
      listings: await ListingModel.find({ userId: user.sub }),
      applications: await ApplicationsModel.find({ userId: user.sub }),
    };

    res.send(userData);
  } catch (error) {
    next(error);
  }
});

router.post("/upload", jwtCheck, async (req, res, next) => {
  try {
    const { user } = req;

    if (!req.files || Object.keys(req.files).length === 0) {
      const e = new Error("No files were uploaded.");
      return next(e);
    }

    const id = await nanoid();
    const sampleFile = req.files.file;
    const uploadPath = "uploads/" + id + ".pdf";

    if (sampleFile.mimetype !== "application/pdf") {
      return res.status(400).send("Invalid filetype!");
    }

    // Check if the user has a cv uploaded already, if so overwrite it with the new one
    const oldFile = await UsersModel.find({ userId: user.sub });
    if (oldFile.length > 0) {
      const path = "uploads/" + oldFile[0].cvId + ".pdf";
      fs.unlinkSync(path);
    }

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, async (err) => {
      if (err) next(err);

      await UsersModel.updateOne(
        { userId: user.sub },
        { cvId: id, originalName: sampleFile.name },
        { upsert: true }
      );
      return res.status(201).send("CV uploaded!");
    });
  } catch (error) {
    next(error);
  }
});

router.use(errors());
module.exports = router;
