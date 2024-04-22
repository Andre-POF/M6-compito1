import { Router } from "express";
import Blog from "../models/blog.model.js";
import multer from "../middleware/multer.js";

export const blogsRoute = Router();

// all the Blogs
blogsRoute.get("/blogPosts", async (req, res, next) => {
  try {
    let blogPosts = await Blog.find();
    res.send(blogPosts);
  } catch (error) {
    next(error);
  }
});

// One of the Blogs
blogsRoute.get("/blogPosts/:_id", async (req, res, next) => {
  try {
    const blogId = req.params._id;
    let blog = await Blog.findById(blogId);
    res.send(blog);
  } catch (error) {
    next(error);
  }
});

// post blog
blogsRoute.post("/blogPosts", async (req, res, next) => {
  try {
    let blog = await Blog.create(req.body);
    res.send(blog).status(400);
  } catch (error) {
    next(error);
  }
});

// edit blog
blogsRoute.put("/blogPosts/:_id", async (req, res, next) => {
  try {
    const blogId = req.params._id;
    let updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body);
    if (!updatedBlog) {
      return res.status(404).send("Blog not found");
    }
    res.send(updatedBlog);
  } catch (error) {
    next(error);
  }
});

// delete blog
blogsRoute.delete("/blogPosts/:_id", async (req, res, next) => {
  try {
    const blogId = req.params._id;
    let deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).send("Blog not found");
    }
    res.send("Blog deleted successfully");
  } catch (error) {
    next(error);
  }
});

// Patch blog cover
blogsRoute.patch("/blogPosts/:_id/cover", multer, async (req, res, next) => {
  try {
    const blogId = req.params._id;
    let updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { avatar: req.file.path },
      { new: true }
    );
    res.send(updatedBlog);
  } catch (error) {
    console.log(error);
  }
});
