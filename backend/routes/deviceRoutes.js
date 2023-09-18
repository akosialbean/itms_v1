import express from "express"
const router = express.Router()
import { protect } from '../middlewares/authMiddleware.js'
import { addDevice, getDevices, getDevice, updateDevice, getDesktopCount, getLaptopCount, getPhoneCount, getDeviceCount } from "../controllers/deviceController.js"

router.get('/', getDevices)
router.post('/add', addDevice)
router.get('/device/:id', getDevice)
router.patch('/device/update/:id', updateDevice)
router.get('/dashboard/desktopCount', getDesktopCount)
router.get('/dashboard/laptopCount', getLaptopCount)
router.get('/dashboard/phoneCount', getPhoneCount)
router.get('/dashboard/deviceCount', getDeviceCount)

export default router