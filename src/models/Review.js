const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'users'
    },
    salon: {
      type: ObjectId,
      ref: 'salon'
    },
    ratings: {
      type: String,
    },
    details: {
      type: String,
      required: [true, "Details is required."],
      minlength: [3, "Details cannot be less than 3 characters."]
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

reviewSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.__v;
  return obj;
};

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;
