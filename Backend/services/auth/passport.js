import GoogleStrategy from "passport-google-oauth20";
import "dotenv/config";
import { generateJWT } from "./index.js";
import User from "../models/user.model.js";

const options = {
  clientID: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  callbackURL: process.env.OAUTH_CALLBACK,
};

const googleStrategy = new GoogleStrategy(
  options,
  async (_, __, profile, passportNext) => {
    try {
      const { email, given_name, family_name, sub } = profile._json;
      const user = await User.findOne({ email });
      if (user) {
        const accToken = await generateJWT({
          _id: user._id,
        });
        passportNext(null, { accToken });
      } else {
        const newUser = new User({
          username: email,
          googleID: sub,
        });
        await newUser.save();
        const accToken = generateJWT({
          username: newUser.username,
        });
        passportNext(null, { accToken });
      }
    } catch (error) {
      passportNext(error);
    }
  }
);

export default googleStrategy;
