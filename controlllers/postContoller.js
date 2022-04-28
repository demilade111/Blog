const asyncHandler = require("express-async-handler");
const Post = require("../models/postmodel");
const Joi = require("joi");

// @ `POST /api/post`
// @ @desc  Create a Post
// @ @access Public
const createPost = asyncHandler(async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(1000).required(),
    content: Joi.string().required(),
    username: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    });
  }
  const { title, content, username } = req.body;

  // Condition to filter out what files to upload
  if (!req.file) {
    return res.status(422).json({
      success: false,
      error: "attached file is not an image",
    });
  }
  //  Create a new post to the database
  const post = await Post.create({
    title: title,
    content: content,
    username: username,
    image: req.file.path,
  });

  if (!post) {
    return res.status(400).JSON({
      message: "Post not created",
    });
  } else {
    res.status(201).json({
      message: "sucessfully created",
      post: {
        id: post._id,
        title: post.title,
        content: post.content,
        image: req.file.path,
      },
    });
  }
});

// @ `GET /api/post`
// @ @desc  Get all Post
// @ @access Public
const getPost = asyncHandler(async (req, res) => {
  res.cookie("username", "farabale");

  // get cookies

  const post = await Post.find().populate("user", ["username", "email"]);
  if (!post) {
    return res.status(400).json({
      message: "Error",
    });
  } else {
    return res.status(200).json(post);
  }
});

// @ `GET /api/searchpost/:title`
// @ @desc  Search a Post
// @ @access Public
const searchPost = asyncHandler(async (req, res) => {
  const post = await Post.find({ title: req.params.title });
  if (!post) {
    return res.status(400).json({
      message: "Post not found",
    });
  } else {
    return res.status(200).json({
      message: "success",
      data: post,
    });
  }
});

// @ `PUT /api/updatepost/:id`
// @ @desc  Create a Post
// @ @access private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    return res.status(400).json({
      message: "Post cannot be updated",
    });
  } else {
    return res.status(200).json({
      message: "Post Updated",
      data: post,
    });
  }
});

// @ `DELETE /api/deletepost/:id`
// @ @desc  Delete a Post
// @ @access private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Post Deleted",
    data: post,
  });
});

module.exports = { getPost, createPost, searchPost, updatePost, deletePost };
