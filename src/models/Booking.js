const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const randomString = require("random-id");

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: ObjectId,
      ref: "users",
    },
    salon: {
      type: ObjectId,
      ref: "salons",
    },
    salon_service: {
      type: ObjectId,
      ref: "salon_services",
    },
    price: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    total_number: {
      type: Number,
      default: 1,
    },
    total_amount: {
      type: Number,
    },
    comment: {
      type: String,
    },
    date_time: {
      type: String,
    },
    code: {
      type: String,
      unique: [true, "Duplicate booking code found."],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

bookingSchema.pre("save", async function (next) {
  this.code = randomString(8, "aA0");
  next();
});

bookingSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.__v;
  if (obj.customer) {
    delete obj.customer.password;
    delete obj.customer.auth_id;
    delete obj.customer.password_reset_token;
    delete obj.customer.created_at;
    delete obj.customer.updated_at;
    delete obj.customer.__v;
  }
  return obj;
};

const Booking = mongoose.model("bookings", bookingSchema);

module.exports = Booking;
