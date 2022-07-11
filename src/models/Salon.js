const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const salonSchema = new mongoose.Schema(
  {
    owner: {
      type: ObjectId,
      ref: "users",
    },
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
  if (obj.owner) {
    delete obj.owner.password;
    delete obj.owner.auth_id;
    delete obj.owner.password_reset_token;
    delete obj.owner.created_at;
    delete obj.owner.updated_at;
    delete obj.owner.__v;
  }
  return obj;
};

const Salon = mongoose.model("salon", salonSchema);

module.exports = Salon;
