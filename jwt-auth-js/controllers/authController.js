const User = require("../models/User");
const errorResponse = require("../utils/errorResponse");


exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    sendToken(user, 201, res);
  } catch (error) {
    return next(error);
  }
};


exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new errorResponse("Please Provide Email & Password", 400));
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new errorResponse("Invalid Credentials", 401));
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid Credentials", 401));
    }
    sendToken(user, 200, res);
  } catch (error) {
    return next(error);
  }
};

exports.forgotPassword = (req, res, next) => {
  return res.send("Register");
};

exports.resetPassword = (req, res, next) => {
  return res.send("Register");
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  return res.status(statusCode).json({
    success: true,
    token,
  });
};
