import mongoose from 'mongoose'

const ipSchema = mongoose.Schema({
    ip: {type: String, required: true},
    status: {type: String, required: true}
}, {
    timestamps: true
})

const IpAddress = mongoose.model('Ip', ipSchema)

export default IpAddress