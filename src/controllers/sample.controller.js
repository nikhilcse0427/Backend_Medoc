import Sample from '../models/sample.js'
import Agent from '../models/agent.js'
import Hospital from '../models/hospital.js'

// Add new sample
export const createSample = async (req, res) => {
  try {
    const { agentId, hospitalId, patientName } = req.body
    if (!agentId || !hospitalId || !patientName) {
      return res.status(400).json({ error: 'agentId, hospitalId, and patientName are required' })
    }
    const sample = await Sample.create({ agent: agentId, hospital: hospitalId, patientName })
    await Agent.findByIdAndUpdate(agentId, { $push: { samples: sample._id } })
    res.status(201).json(sample)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

// Mark sample collected
export const markSampleCollected = async (req, res) => {
  try {
    const sample = await Sample.findByIdAndUpdate(
      req.params.id,
      { status: 'collected', collectedAt: new Date() },
      { new: true }
    )
    if (!sample) return res.status(404).json({ error: 'Sample not found' })
    res.json(sample)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

// Fetch samples for an agent
export const getSamplesForAgent = async (req, res) => {
  try {
    const { agentId } = req.params
    const samples = await Sample.find({ agent: agentId }).populate('hospital')
    res.json(samples)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

// Report delay (already present, just ensure Sample is imported)
export const reportDelay = async (req, res) => {
  try {
    const { reason } = req.body
    if (!reason) {
      return res.status(400).json({ error: 'Delay reason is required' })
    }
    const sample = await Sample.findByIdAndUpdate(
      req.params.id,
      {
        status: 'delayed',
        delayReason: reason
      },
      { new: true }
    )
    if (!sample) return res.status(404).json({ error: 'Sample not found' })
    res.json(sample)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}
