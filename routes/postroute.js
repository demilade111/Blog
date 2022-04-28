const express = require("express");

const { getPost, createPost, searchPost, deletePost, updatePost } = require("../controlllers/postContoller");
const route = express.Router();



route
  .get("/post", getPost)
  .get("/searchpost/:title", searchPost)
  .post("/post",  createPost)
  .put("/updatepost/:id", updatePost)
  .delete("/deletepost/:id", deletePost);

module.exports = route;

