import express from 'express'
const router = express.Router()

import { getAllIp } from '../controllers/ipController.js'

router.get('/', getAllIp)

export default router