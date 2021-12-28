const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplicationsSchema = new Schema({
  title: { type: String, required: true },
  userId: { type: String, required: true },
  listingId: { type: String, required: true },
  employerId: { type: String, required: true },
  cvId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: Boolean, default: true },
  contact: Number,
});

ApplicationsSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("Applications", ApplicationsSchema);
