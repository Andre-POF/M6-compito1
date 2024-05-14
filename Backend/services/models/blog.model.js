import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    category: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    readTime: {
      value: {
        type: Number,
        required: false,
      },
      unit: {
        type: String,
        required: false,
      },
    },
    author: {
      name: {
        type: String,
        required: false,
      },
      avatar: {
        type: String,
        required: false,
      },
    },
    content: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    collection: "blogs",
  }
);

export default model("Blog", blogSchema);
