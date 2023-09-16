import express from "express"
const router = express.Router()
import { protect } from '../middlewares/authMiddleware.js'
import { addDevice, getDevices, getDevice, updateDevice } from "../controllers/deviceController.js"

router.get('/', getDevices)
router.post('/add', addDevice)
router.get('/device/:id', getDevice)
router.post('/device/:id', updateDevice)

export default router