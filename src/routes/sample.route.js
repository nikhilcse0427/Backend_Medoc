import express from 'express'
import { createSample, markSampleCollected, getSamplesForAgent, reportDelay } from '../controllers/sample.controller.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/samples', auth, createSample)
router.patch('/samples/:id/collect', auth, markSampleCollected)
router.get('/agents/:agentId/samples', auth, getSamplesForAgent)
router.patch('/samples/:id/delay', auth, reportDelay)

export default router 