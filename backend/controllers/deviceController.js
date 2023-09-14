import asyncHandler from 'express-async-handler'
import Device from '../models/deviceModel.js'


// ADDING OF DEVICE
const addDevice = asyncHandler(async (req, res) => {
    const {
        d_type,
        d_brand,
        d_model,
        d_sn,
        d_hostName
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
        d_hostName
    })

    if(device){
        res.status(201).json({
            _id: device._id,
            d_type: device.d_type,
            d_brand: device.d_brand,
            d_model: device.d_model,
            d_sn: device.d_sn,
            d_hostName: device.d_hostName
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const getDevices = asyncHandler(async (req, res) => {
    const devices = await Device.find()
    res.status(200).json(devices)
})

export {
    addDevice,
    getDevices
}