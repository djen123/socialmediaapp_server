import mongoose from 'mongoose'
import University from './university.model.js'
import User from './user.model.js'

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: [true, 'Degree is required.'],
  },
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: University,
    required: [true, 'University is required.']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: [true, 'User is required.']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required.']
  },
  endDate: {
    type: Date,
  }
}, {
  timestamps: true
})

const Education = mongoose.model('Education', educationSchema)

export default Education