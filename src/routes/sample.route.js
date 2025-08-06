import express from 'express'
import { createSample, markSampleCollected, getSamplesForAgent, reportDelay } from '../controllers/sample.controller.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/samples', createSample)
router.patch('/samples/:id/collect',markSampleCollected)
router.get('/agents/:agentId/samples',getSamplesForAgent)
router.patch('/samples/:id/delay',reportDelay)

export default router 