import mongoose from 'mongoose';

// Define the Ticket model schema and create the model
const ticketSchema = new mongoose.Schema({
    // schema fields here
    title: String,
    description: String,
    category: String,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;