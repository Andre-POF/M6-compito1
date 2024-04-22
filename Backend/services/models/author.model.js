import { Schema, model } from "mongoose";

//exp
const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },

  {
    collection: "authors",
  }
);

export default model("Author", authorSchema);
