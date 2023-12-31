import mongoose from 'mongoose'

const deviceSchema = mongoose.Schema({
    d_type: {type: String, required: true},
    d_brand: {type: String, required: true},
    d_model: {type: String, required: true},
    d_sn: {type: String, required: false},
    d_hostName: {type: String, required: false},
    d_ipAddress: {type: String, required: false},
    d_macAddress: {type: String, required: false},
    d_assignedToDepartment: {type: String, required: false},
    d_assignedToEmployee: {type: String, required: false}
}, {
    timestamps: true
})

const Device = mongoose.model('Device', deviceSchema)

export default Device