const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 1000,
      minlength: 5,
    },
    image: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
