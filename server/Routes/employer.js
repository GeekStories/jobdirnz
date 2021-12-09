const { celebrate, Joi, errors, Segments, next } = require("celebrate");

Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const router = express.Router();
const cors = require("cors");

const EmployerModel = require("../Models/employer");

const getEmployerValidationSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.objectId(),
  }),
};

router.use(cors());

router.get("/:id", celebrate(getEmployerValidationSchema), async (req, res) => {
  try {
    res.send(await EmployerModel.findById(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.use(errors());
module.exports = router;