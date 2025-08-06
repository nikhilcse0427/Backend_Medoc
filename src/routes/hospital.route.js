import express from 'express'
import { createHospital, getHospitals } from '../controllers/hospital.controller.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/hospitals', createHospital)
router.get('/hospitals', getHospitals)

export default router 