import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
      image: {
      type: String,   // URL of the image
      default: null
    },

  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
