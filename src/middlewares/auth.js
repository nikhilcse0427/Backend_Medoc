import jwt from 'jsonwebtoken'
import Agent from '../models/agent.js'

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.agent = await Agent.findById(decoded.id).select('-password')
    if (!req.agent) return res.status(401).json({ error: 'Invalid token' })
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

export default auth 