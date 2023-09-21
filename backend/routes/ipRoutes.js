import express from 'express'
const router = express.Router()

import { getAllIp, getInactiveIp } from '../controllers/ipController.js'

router.get('/', getAllIp)
router.get('/inactive', getInactiveIp)

export default router