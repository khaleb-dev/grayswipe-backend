const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email already used by another user"],
      validate: [isEmail, "Please enter a valid email."],
    },
    phone_no: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Password cannot be less than 8 characters."],
    },
    auth_token: {
      // for third party auth
      type: String,
    },
    password_reset_token: {
      type: String,
    },
    display_name: {
      type: String,
    },
    age: {
      type: String,
    },
    gender: {
      type: String,
    },
    city: {
      type: String,
    },
    profile_photo: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (emailOrPhoneNumber, password) {
  const user = await this.findOne({
    $or: [{ email: emailOrPhoneNumber }, { phone_no: emailOrPhoneNumber }],
  });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
  }

  throw Error("invalid credentials");
};

userSchema.statics.updatePassword = async function (token, new_password) {
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(new_password, salt);

  const user = await this.findOneAndUpdate(
    { password_reset_token: token },
    { $set: { password_reset_token: "", password: password } }
  );
  if (user) {
    return user;
  }

  throw Error("invalid token");
};

userSchema.statics.currentUser = async function (id) {
  return await this.findOne({ _id: id });
};

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.auth_token;
  delete obj.password_reset_token;
  delete obj.__v;
  return obj;
};

const User = mongoose.model("users", userSchema);

module.exports = User;
