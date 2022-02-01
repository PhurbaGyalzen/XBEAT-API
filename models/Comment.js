import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
  }
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
