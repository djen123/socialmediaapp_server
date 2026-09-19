import mongoose from 'mongoose'

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'University name is required.'],
  },
  logo: {
    type: String,
    default: 'https://img.icons8.com/?size=100&id=5iWXIjJODNZj&format=png&color=000000'
  }
})

const University = mongoose.model('University', universitySchema)

export default University