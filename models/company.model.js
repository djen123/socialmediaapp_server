import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required.'],
  },
  logo: {
    type: String,
    default: 'https://img.icons8.com/?size=100&id=53426&format=png&color=000000'
  }
})

const Company = mongoose.model('Company', companySchema)

export default Company