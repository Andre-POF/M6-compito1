import { Router } from "express";
import { generateJWT } from "../auth/index.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const userRoute = Router();

userRoute.get("/", async (req, res, next) => {
  res.send("Login Page");
});

// Register new user
userRoute.post("/users/register", async (req, res, next) => {
  try {
    let user = await User.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// Login user
userRoute.post("/users/login", async (req, res, next) => {
  try {
    let userFound = await User.findOne({
      username: req.body.username,
    });
    if (userFound) {
      const passwordMatches = await bcrypt.compare(
        req.body.password,
        userFound.password
      );
      if (passwordMatches) {
        const token = await generateJWT({
          username: userFound.username,
        });
        res.send({ User: userFound, token });
      } else {
        res.status(400).send("Wrong password");
      }
    } else {
      res.status(400).send("User not found");
    }
  } catch (error) {
    next(error);
  }
});

// Endpoint Test c/ token

userRoute.get("/me", authMiddleware, async (req, res, next) => {
  try {
    let user = await User.findById(req.user.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});
