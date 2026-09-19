import mongoose from "mongoose"
import User from './user.model.js'

const networkSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted'],
    default: 'pending'
  }
}, {
  timestamps: true
})

const Network = mongoose.model('Network', networkSchema)

export default Network