import University from '../models/university.model.js'

export const fetchUniversities = async (req, res) => {
  try {
    const universities = await University.find()

    res.json({ universities })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
}
