const jwt = require("../lib/jwt");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { SECRET } = require("../configuration/config");

exports.register = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if (user) {
    throw new Error("There’s an existing account associated with this email!");
  }
  const createdUser = await User.create(userData);

  // const token = await generateToken(createdUser);

  // return token;
  return createdUser;
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("Username or password is invalid!");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Username or password is invalid!");
  }

  const token = await generateToken(user);

  return { token: token, userId: user._id, email: user.email, expiresIn: 3600 };
};

async function generateToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

  return token;
}
