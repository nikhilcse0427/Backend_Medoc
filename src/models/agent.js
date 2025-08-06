import mongoose from 'mongoose'

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  samples: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sample' }]
}, { timestamps: true })

export default mongoose.model('Agent', agentSchema)
