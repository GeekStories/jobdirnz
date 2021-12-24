const random = require("mongoose-simple-random");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const ListingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  listingDate: { type: Date, required: true },
  closingDate: { type: Date, required: true },
  payRate: { type: String, default: "TBD" },
  payType: { type: String, default: "TBD" },
  positionType: { type: String, required: true },
  employmentHours: Number,
  employerId: { type: String, required: true },
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
