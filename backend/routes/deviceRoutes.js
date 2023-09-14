import express from "express"
const router = express.Router()
import { protect } from '../middlewares/authMiddleware.js'
import { addDevice, getDevices } from "../controllers/deviceController.js"

router.get('/', getDevices)
router.post('/add', addDevice)

export default router