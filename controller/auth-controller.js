const User = require("../models/User.js");

const handleError = (err) => {
  // console.log(err.message, err.code);
  let error = { email: " ", password: " " };

  if (err.code == 11000) {
    return "Email Already Exist";
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((properties) => {
      // console.log(properties);
      error[properties.path] = properties.message;
    });
  }
  return error;
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
    res.status(201).json(user);
  } catch (err) {
    res.status(400).send(handleError(err));
  }
  // User.create({ username, password });
  // res.send("New Sign-up");
};
module.exports.login_post = (req, res) => {
  const { username, password } = req.body;
  res.send("New Login");
};
