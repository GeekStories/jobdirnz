const { celebrate, Joi, Segments, errors, next } = require("celebrate");
const express = require("express");
const router = express.Router();
const cors = require("cors");

const ContactModel = require("../Models/contact");

router.use(express.json());
router.use(cors());

const contactValidation = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    accountNumber: Joi.string().min(0),
    reason: Joi.string().required(),
    message: Joi.string().max(1000),
  }),
};

router.post("/", celebrate(contactValidation), async (req, res, next) => {
  try {
    const contact = new ContactModel(req.body);
    contact.save();
    res.send("success");
  } catch (error) {
    next(error);
  }
});

router.use(errors());
module.exports = router;
