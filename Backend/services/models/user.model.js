import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    googleID: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    birthDate: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export default model("User", userSchema);
