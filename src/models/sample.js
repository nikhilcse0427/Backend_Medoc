import mongoose from 'mongoose'

const sampleSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['scheduled', 'collected', 'delayed'], default: 'scheduled'
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    required: true
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  collectedAt: {
    type: Date
  },
  delayReason: {
    type: String
  }
}, { timestamps: true })

export default mongoose.model('Sample', sampleSchema)
