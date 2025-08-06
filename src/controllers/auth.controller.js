import Agent from '../models/agent.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body
    if (!name || !phone || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    const existing = await Agent.findOne({ $or: [{ email }, { phone }] })
    if (existing) {
      return res.status(409).json({ error: 'Agent already exists' })
    }
    const hashed = await bcrypt.hash(password, 10)
    const agent = await Agent.create({ name, phone, email, password: hashed })
    res.status(201).json({ id: agent._id, name: agent.name, email: agent.email, phone: agent.phone })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }
    const agent = await Agent.findOne({ email })
    if (!agent) return res.status(401).json({ error: 'Invalid credentials' })
    const match = await bcrypt.compare(password, agent.password)
    if (!match) return res.status(401).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ id: agent._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, agent: { id: agent._id, name: agent.name, email: agent.email, phone: agent.phone } })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}
