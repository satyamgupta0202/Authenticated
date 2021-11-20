module.exports.signup_get = (req, res) => {
  res.render("sign-up");
};
module.exports.login_get = (req, res) => {
  res.render("Login");
};
module.exports.signup_post = (req, res) => {
  const { username, password } = req.body;
  res.send("New Sign-up");
};
module.exports.login_post = (req, res) => {
  const { username, password } = req.body;
  res.send("New Login");
};
