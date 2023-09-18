import express from "express"
const router = express.Router()
import { protect } from '../middlewares/authMiddleware.js'
import { addDevice, getDevices, getDevice, updateDevice, getDesktopCount, getLaptopCount } from "../controllers/deviceController.js"

router.get('/', getDevices)
router.post('/add', addDevice)
router.get('/device/:id', getDevice)
router.patch('/device/update/:id', updateDevice)
router.get('/dashboard/desktopCount', getDesktopCount)
router.get('/dashboard/laptopCount', getLaptopCount)

export default router