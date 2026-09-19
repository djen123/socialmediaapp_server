import Company from '../models/company.model.js'

export const fetchCompanies = async (req, res) => {
  try {
    const companies = await Company.find()

    res.json({ companies })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
}
