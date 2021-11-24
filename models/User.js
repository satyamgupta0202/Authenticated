const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const userSchema = new mongoose.Schema({
  email: {
    required: [true, "email not entered"],
    type: String,
    lowercase: [true, "Enter email in lowercase"],
    unique: true,
    validate: [isEmail, "please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Password not entered"],
    unique: true,
    minlength: [6, "length of the password should be more than 6"],
  },
});

userSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log("saved before being executed", this);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const oks = await bcrypt.compare(password, user.password);
    if (oks) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect Email");
};

const User = mongoose.model("user", userSchema);
module.exports = User;
