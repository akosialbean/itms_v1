import mongoose from 'mongoose'

const deviceSchema = mongoose.Schema({
    d_type: {type: String, required: true},
    d_brand: {type: String, required: true},
    d_model: {type: String, required: true},
    d_sn: {type: String, required: true},
    d_hostName: {type: String, required: false}
}, {
    timstamps: true
})

const Device = mongoose.model('Device', deviceSchema)

export default Device