const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployerSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  contact: { type: String, required: true },
  listings: String
});

EmployerSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("Employer", EmployerSchema);
