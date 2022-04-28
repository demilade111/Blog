const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      required: [true, 'Username is required'],


    },
    email: {
      type: String,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 12
    }
  },
  { timestamps: true }
);




module.exports = mongoose.model("User", userSchema);
