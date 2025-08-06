// controllers/sampleController.js

import Sample from '../models/Sample.js'
import Agent from '../models/agent.js'
import Hospital from '../models/Hospital.js'

// ✅ Add new sample
export const createSample = async (req, res) => {
  try {
    const { agentId, hospitalId, patientName } = req.body

    if (!agentId || !hospitalId || !patientName) {
      return res.status(400).json({ error: 'agentId, hospitalId, and patientName are required.' })
    }

    const agentExists = await Agent.findById(agentId)
    const hospitalExists = await Hospital.findById(hospitalId)

    if (!agentExists || !hospitalExists) {
      return res.status(404).json({ error: 'Agent or Hospital not found.' })
    }

    const sample = await Sample.create({
      agent: agentId,
      hospital: hospitalId,
      patientName
    })

    res.status(201).json(sample)
  } catch (err) {
    console.error('Error creating sample:', err)
    res.status(500).json({ error: 'Server error. Could not create sample.' })
  }
}

// ✅ Mark sample as collected
export const markSampleCollected = async (req, res) => {
  try {
    const sample = await Sample.findByIdAndUpdate(
      req.params.id,
      {
        status: 'collected',
        collectedAt: new Date()
      },
      { new: true }
    )

    if (!sample) {
      return res.status(404).json({ error: 'Sample not found.' })
    }

    res.json(sample)
  } catch (err) {
    console.error('Error updating sample status to collected:', err)
    res.status(500).json({ error: 'Server error. Could not update sample status.' })
  }
}

// ✅ Fetch samples for an agent
export const getSamplesForAgent = async (req, res) => {
  try {
    const { agentId } = req.params

    const samples = await Sample.find({ agent: agentId }).populate('hospital')

    res.json(samples)
  } catch (err) {
    console.error('Error fetching samples for agent:', err)
    res.status(500).json({ error: 'Server error. Could not fetch samples.' })
  }
}

// ✅ Report delay
export const reportDelay = async (req, res) => {
  try {
    const { reason } = req.body

    if (!reason) {
      return res.status(400).json({ error: 'Delay reason is required.' })
    }

    const sample = await Sample.findByIdAndUpdate(
      req.params.id,
      {
        status: 'delayed',
        delayReason: reason
      },
      { new: true }
    )

    if (!sample) {
      return res.status(404).json({ error: 'Sample not found.' })
    }

    res.json(sample)
  } catch (err) {
    console.error('Error reporting delay:', err)
    res.status(500).json({ error: 'Server error. Could not update delay status.' })
  }
}
