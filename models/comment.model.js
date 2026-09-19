import mongoose from "mongoose"
import User from './user.model.js'
import Post from './post.model.js'

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Post,
    required: true
  }
}, {
  timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment