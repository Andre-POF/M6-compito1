import User from "../models/user.model.js";
import { verifyJWT } from "../auth/index.js";

export const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(400).send("Please login.");
    } else {
      const decoded = await verifyJWT(
        req.headers.authorization.replace("Bearer ", "")
      );
      if (decoded.exp) {
        delete decoded.iat;
        delete decoded.exp;
        const me = await User.findOne({
          ...decoded,
        });
        console.log(me);
        if (me) {
          req.User = me;
          next();
        } else {
          res.status(401).send("User not found");
        }
      } else {
        res.status(401).send("Login again please");
      }
    }
  } catch (error) {
    next(error);
  }
};
