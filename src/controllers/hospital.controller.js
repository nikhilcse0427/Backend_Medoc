export const createHospital = async (req, res) => {
  try {
    const { name, address, contactPerson, phone } = req.body
    if (!name || !address || !contactPerson || !phone) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    const hospital = await Hospital.create({ name, address, contactPerson, phone })
    res.status(201).json(hospital)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find()
    res.json(hospitals)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
} 