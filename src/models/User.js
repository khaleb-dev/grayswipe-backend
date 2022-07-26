const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
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
      unique: [true, "Phone number already used by another user"],
    },
    password: {
      type: String,
    },
    auth_id: {
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
  if (this.password || this.auth_id) {
    const salt = await bcrypt.genSalt();
    if (this.password && this.password.length > 0) {
      this.password = await bcrypt.hash(this.password, salt);
    } else {
      this.password = "";
    }
    if (this.auth_id && this.auth_id.length > 0) {
      this.auth_id = await bcrypt.hash(this.auth_id, salt);
    } else {
      this.auth_id = "";
    }
    // set display name
    if (!this.display_name) {
      this.display_name = this.first_name;
    }
    next();
  }

  throw Error("invalid passkey");
});

userSchema.statics.login = async function (emailOrPhoneNumber, password) {
  const user = await this.findOne({
    $or: [{ email: emailOrPhoneNumber }, { phone_no: emailOrPhoneNumber }],
  });
  if (user) {
    console.log(user.password);
    if (user.password && user.password.length > 0) {
      const pwd = await bcrypt.compare(password, user.password);
      if (pwd) {
        return user;
      }
    }

    if (user.auth_id && user.auth_id.length > 0) {
      const aid = await bcrypt.compare(password, user.auth_id);
      if (aid) {
        return user;
      }
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

userSchema.statics.changePassword = async function (
  user,
  old_password,
  new_password
) {
  if (user.password) {
    let old_pwd = await bcrypt.compare(old_password, user.password);
    if (old_pwd) {
      const salt = await bcrypt.genSalt();
      const new_pwd = await bcrypt.hash(new_password, salt);

      await user.updateOne({ password: new_pwd });
      return user;
    }

    throw Error("invalid token");
  } else {
    const salt = await bcrypt.genSalt();
    const new_pwd = await bcrypt.hash(new_password, salt);

    await user.updateOne({ password: new_pwd });
    return user;
  }
};

userSchema.statics.currentUser = async function (id) {
  return await this.findOne({ _id: id });
};

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.auth_id;
  delete obj.password_reset_token;
  delete obj.__v;
  return obj;
};

const User = mongoose.model("users", userSchema);

module.exports = User;
