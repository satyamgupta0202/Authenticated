const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const handleError = (err) => {
  // console.log(err.message, err.code);
  let error = { email: "", password: "" };

  if (err.message === "incorrect email") {
    error.email = "Invalid Email";
  }
  if (err.message === "incorrect password") {
    error.password = "Invalid password Credentials";
  }
  if (err.code === 11000) {
    error.email = "email id already exist";
    error.password = " ";
    return error;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((properties) => {
      // console.log(properties);
      error[properties.path] = properties.message;
    });
  }
  return error;
};

const age = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "iiit jabalpur", {
    expiresIn: age,
  });
};
module.exports.signup_get = (req, res) => {
  res.render("sign-up");
};
module.exports.login_get = (req, res) => {
  res.render("Login");
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: age * 1000,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(400).send(handleError(err));
  }
};
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: age * 1000,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};
