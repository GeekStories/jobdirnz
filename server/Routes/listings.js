const { celebrate, Joi, errors, Segments, next } = require("celebrate");
const express = require("express");
const router = express.Router();
const cors = require("cors");

const Listings = require("../Models/listing");

router.use(cors());

router.get("/", async (req, res, next) => {
  try {
    res.send(await Listings.find({}).limit(80).sort("-listingDate"));
  } catch (error) {
    next(error);
  }
});

router.use(errors());
module.exports = router;
