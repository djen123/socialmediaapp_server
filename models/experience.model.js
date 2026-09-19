import mongoose from 'mongoose'
import Company from './company.model.js'
import User from './user.model.js'

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required.'],
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Company,
    required: [true, 'Company is required.']
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

const Experience = mongoose.model('Experience', experienceSchema)

export default Experience