import asyncHandler from 'express-async-handler'
import Ticket from '../models/ticketModel.js'

//View tickets
//route POST/api/ticket
//public

const getTicket = asyncHandler(async (req, res) => {
    const tickets = await Ticket.find({});
    res.json(tickets);
});

//Create new ticket
//route POST/api/ticket
//public

const createTicket = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    const ticket = new Ticket({
        title,
        description,
        category,
    });
    const createdTicket = await ticket.save();
    res.status(201).json(createdTicket);
});


//Update ticket
//route PUT/api/ticket
//public

const updateTicket = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (ticket) {
        ticket.title = title;
        ticket.description = description;
        ticket.category = category;

        const updatedTicket = await ticket.save();
        res.json(updatedTicket);
    } else {
        res.status(404);
        throw new Error('Ticket not found');
    }
});


//Delete ticket
//route DELETE/api/users
//public

const deleteTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);

    if (ticket) {
        await ticket.deleteOne();
        res.json({ message: 'Ticket removed' });
    } else {
        res.status(404);
        throw new Error('Ticket not found');
    }
});


export {
    createTicket,
    getTicket,
    updateTicket,
    deleteTicket
}