const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const Joi = require("joi");

// @ `POST /api/auth/register`
// @ @desc Register a user
// @ @access Public
const Register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const scheme = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });
  const { error } = scheme.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  });
  if (!user) {
    return res.status(400).json({
      message: "User cannot be created",
    });
  } else {
    return res.status(200).json({
      message: "sucessfully created",
      user: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });
  }
});

// @ `POST /api/auth/login`
// @ @desc  Login a user
// @ @access Public
const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({
      message: "User does not exist",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (user.email === email && isMatch) {
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_PRIVATE_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "sucessfully logged in",
      user: {
        username: user.username,
        email: user.email,
      },
      token: token,
    });
  } else {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }
});

module.exports = {
  Register,
  Login,
};
