import mongoose from "mongoose";
import User from "./user.model.js";
import Post from "./post.model.js";

const CommentSchema = new mongoose.Schema({
   content:{
    type:String,
    required:true
   },
   author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:User,
    requried:true
   },
   post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:Post,
    required:true
   }
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
