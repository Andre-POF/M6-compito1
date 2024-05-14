import { Router } from "express";
import passport from "passport";
import { config } from "dotenv";

export const googleUserRoute = Router();

googleUserRoute.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleUserRoute.get(
  "/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    try {
      res.redirect(`http://localhost:3000/home?accToken=${req.user.accToken}`);
    } catch (error) {
      next(error);
    }
  }
);
