import mongoose from 'mongoose'

const deviceSchema = mongoose.Schema({
    t_ticketId: {type: String, required: true},
    t_ticketTitle: {type: String, required: true},
    t_ticketStatus: {type: String, required: true}
}, {
    timstamps: true
})

const Device = mongoose.model('Device', deviceSchema)

export default Device