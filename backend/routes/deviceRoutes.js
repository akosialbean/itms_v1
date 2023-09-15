import express from "express"
const router = express.Router()
import { protect } from '../middlewares/authMiddleware.js'
import { addDevice, getDevices, getDevice } from "../controllers/deviceController.js"

router.get('/', getDevices)
router.post('/add', addDevice)
router.get('/device/:id', getDevice)

export default router