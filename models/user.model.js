import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    minlength: [3, 'Invalid name. Name must be at least 3 characters long.']
  },
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  bio: {
    type: String,
    default: '',
    maxLength: [200, 'Invalid bio. Max 200 characters allowed.']
  },
  about: {
    type: String,
    default: '',
    maxLength: [500, 'Invalid bio. Max 500 characters allowed.']
  },
  location: {
    type: String,
    default: '',
  },
  skills: {
    type: [String],
    default: []
  },
  avatar: {
    type: String,
    default: 'https://static.vecteezy.com/system/resources/previews/013/360/247/non_2x/default-avatar-photo-icon-social-media-profile-sign-symbol-vector.jpg'
  },
  coverImage: {
    type: String,
    default: 'https://img.magnific.com/free-photo/gradient-dark-blue-futuristic-digital-grid-background_53876-129728.jpg?semt=ais_hybrid&w=740&q=80'
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User