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

const User = mongoose.model("user", userSchema);
module.exports = User;
