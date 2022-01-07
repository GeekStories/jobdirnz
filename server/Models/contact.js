const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactSchema = new Schema({
  email: { type: String, required: true },
  reason: { type: String, required: true },
  message: { type: String, required: true },
  accountNumber: String,
});

ContactSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("Contact", ContactSchema);
