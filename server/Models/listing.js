const mongoose = require("mongoose");
const { Schema } = mongoose;

const ListingSchema = new Schema({
  title: String,
  description: String,
  city: String,
  listingDate: Date,
  closingDate: Date,
  creatorId: String
});

ListingSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("Listing", ListingSchema);
