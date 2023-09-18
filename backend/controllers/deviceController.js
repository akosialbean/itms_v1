import asyncHandler from 'express-async-handler'
import Device from '../models/deviceModel.js'

// ADDING OF DEVICE
const addDevice = asyncHandler(async (req, res) => {
    const {
        d_type,
        d_brand,
        d_model,
        d_sn,
        d_hostName,
        d_ipAddress,
        d_macAddress,
        d_assignedToDepartment,
        d_assignedToEmployee
    } = req.body
    const hostName = await Device.findOne({d_hostName})
    
    if(hostName){
        res.status(400)
        throw new Error('Device already exists')
    }

    const device = await Device.create({
        d_type,
        d_brand,
        d_model,
        d_sn,
        d_hostName,
        d_ipAddress,
        d_macAddress,
        d_assignedToDepartment,
        d_assignedToEmployee
    })

    if(device){
        res.status(201).json({
            _id: device._id,
            d_type: device.d_type,
            d_brand: device.d_brand,
            d_model: device.d_model,
            d_sn: device.d_sn,
            d_hostName: device.d_hostName,
            d_ipAddress: device.d_ipAddress,
            d_macAddress: device.d_macAddress,
            d_assignedToDepartment: device.d_assignedToDepartment,
            d_assignedToEmployee: device.d_assignedToEmployee
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const getDevices = asyncHandler(async (req, res) => {
    const devices = await Device.find()
    res.header('Access-Control-Allow-Origin', '*')
    res.status(200).json(devices)
})

const getDevice = asyncHandler(async (req, res) => {
    const device = await Device.findOne({_id: req.params.id})
    res.header('Access-Control-Allow-Origin', '*')
    res.status(200).json(device)
})

const updateDevice = asyncHandler(async (req, res, {id}) => {
    const device = await Device.findById(req.params.id)
    // res.send(device)
    // res.header('Access-Control-Allow-Origin', '*')
    

    if(device){
        device.d_type = req.body.d_type || device.d_type
        device.d_brand = req.body.d_brand || device.d_brand
        device.d_model = req.body.d_model || device.d_model
        device.d_sn = req.body.d_sn || device.d_sn
        device.d_hostName = req.body.d_hostName || device.d_hostName
        device.d_ipAddress = req.body.d_ipAddress || device.d_ipAddress
        device.d_macAddress = req.body.d_macAddress || device.d_macAddress
        device.d_assignedToDepartment = req.body.d_assignedToDepartment || device.d_assignedToDepartment
        device.d_assignedToEmployee = req.body.d_assignedToEmployee || device.d_assignedToEmployee

        const updatedDevice = await device.save()

        res.status(200).json({
            _id: updatedDevice._id,
            d_type: updatedDevice.d_type,
            d_brand: updatedDevice.d_brand,
            d_model: updatedDevice.d_model,
            d_sn: updatedDevice.d_sn,
            d_hostname: updatedDevice.d_hostName,
            d_ipAddress: updatedDevice.d_ipAddress,
            d_macAddress: updatedDevice.d_macAddress,
            d_assignedToDepartment: updatedDevice.d_assignedToDepartment,
            d_assignedToEmployee: updatedDevice.d_assignedToEmployee
        })
    }else{
        res.status(404)
        throw new Error('Device not found')
    }
    res.status(200).json({message: 'Device details updated'})
    res.send('Updating record')
})

export {
    addDevice,
    getDevices,
    getDevice,
    updateDevice
}