const random = require("mongoose-simple-random");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const ListingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  listingDate: { type: Date, required: true },
  closingDate: { type: Date, required: true },
  payRate: { type: String, default: "tbd" },
  payType: { type: String, default: "tbd" },
  positionType: { type: String, required: true },
  employmentHours: { type: String, default: "tbd" },
  employerId: { type: String, required: true },
  editCount: { type: Number, default: 0 },
});

ListingSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

ListingSchema.plugin(random);
module.exports = mongoose.model("Listing", ListingSchema);
