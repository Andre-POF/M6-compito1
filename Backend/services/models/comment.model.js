import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  {
    collection: "comments",
    timestamps: true,
  }
);

export default model("Comment", commentSchema);
