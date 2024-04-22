import { Router } from "express";
import Author from "../models/author.model.js";
import multer from "../middleware/multer.js";

export const authorsRoute = Router();

// all the authors
authorsRoute.get("/authors", async (req, res) => {
  let authors = await Author.find();
  res.send(authors);
  console.log("all the authors");
});

// get author by id
authorsRoute.get("/authors/:_id", async (req, res, next) => {
  const authorId = req.params._id;
  let author = await Author.findById(authorId);
  res.send(author);
});

// post author
authorsRoute.post("/authors", async (req, res, next) => {
  try {
    let author = await Author.create(req.body);
    res.send(author).status(400);
  } catch (error) {
    next(error);
  }
});

// edit author
authorsRoute.put("/authors/:_id", async (req, res, next) => {
  try {
    const authorId = req.params._id;
    let updatedAuthor = await Author.findByIdAndUpdate(authorId, req.body);
    if (!updatedAuthor) {
      return res.status(404).send("Author not found");
    }
    res.send(updatedAuthor);
  } catch (error) {
    next(error);
  }
});

// delete author
authorsRoute.delete("/authors/:_id", async (req, res, next) => {
  try {
    const authorId = req.params._id;
    let deletedAuthor = await Author.findByIdAndDelete(authorId);
    if (!deletedAuthor) {
      return res.status(404).send("Author not found");
    }
    res.send("Author deleted successfully").status(200);
  } catch (error) {
    next(error);
  }
});

// patch avatar

authorsRoute.patch("/authors/:_id/avatar", multer, async (req, res, next) => {
  try {
    const authorId = req.params._id;
    let updatedAuthor = await Author.findByIdAndUpdate(
      authorId,
      { avatar: req.file.path },
      { new: true }
    );
    res.send(updatedAuthor);
  } catch (error) {
    console.log(error);
  }
});
