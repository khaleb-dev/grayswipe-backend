const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const salonServiceSchema = new mongoose.Schema(
  {
    salon: {
      type: ObjectId,
      ref: "salons",
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    price: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    estimated_time: {
      type: String,
    },
    photo_urls: {
      type: Array,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

salonServiceSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.__v;
  delete obj.deletedAt;
  delete obj.is_deleted;
  if (obj.salon) {
    delete obj.salon.__v;
  }
  return obj;
};

const SalonService = mongoose.model("salon_services", salonServiceSchema);

module.exports = SalonService;
