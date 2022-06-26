const mongoose = require("mongoose");

const salonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    category: {
      type: String,
    },
    details: {
      type: String,
    },
    members: {
      type: Number,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    postcode: {
      type: String,
    },
    location: {
      type: String,
    },
    photo_urls: {
      type: Array,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

salonSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.__v;
  return obj;
};

const Salon = mongoose.model("salon", salonSchema);

module.exports = Salon;
