import { Router } from "express";
import Comment from "../models/comment.model.js";
import Blog from "../models/blog.model.js";
import multer from "../middleware/multer.js";

export const commentsRoute = Router();

// All comments from one blog

commentsRoute.get("/blogPosts/:_id/comments", async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params._id).populate("comments");
    res.send(blog.comments);
  } catch (error) {
    next(error);
  }
});

// Specific comment from a specific post

commentsRoute.get(
  "/blogPosts/:blogId/comments/:commentId",
  async (req, res, next) => {
    try {
      const blog = await Blog.findById(req.params.blogId).populate("comments");
      const comment = blog.comments.find(
        (comment) => comment._id == req.params.commentId
      );
      if (!comment) {
        return res.status(404).send("Comment not found");
      }
      res.send(comment);
    } catch (error) {
      next(error);
    }
  }
);

// Post a comment on a Blog entry

commentsRoute.post("/blogPosts/:_id", async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params._id);
    let newComment = await Comment.create({ ...req.body, blog: blog });
    blog.comments.push(newComment._id);
    await blog.save();
    res.send(newComment);
  } catch (error) {
    next(error);
  }
});

// Edit a comment

commentsRoute.put(
  "/blogPosts/:blogId/comments/:commentId",
  async (req, res, next) => {
    try {
      const blog = await Blog.findByIdAndUpdate(req.params.blogId, req.body, {
        new: true,
      }).populate("comments");
      const modifiedComment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        req.body,
        { new: true }
      );
      res.send(modifiedComment);
    } catch (error) {
      next(error);
    }
  }
);

// Delete a comment

commentsRoute.delete(
  "/blogPosts/:blogId/comments/:commentId",
  async (req, res, next) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      const deletedComment = await Comment.findByIdAndDelete(
        req.params.commentId
      );
      res.send("Comment Deleted");
    } catch (error) {
      next(error);
    }
  }
);
