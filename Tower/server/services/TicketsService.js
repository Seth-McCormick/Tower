import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class TicketsService {

    async getById(id) {
        const ticket = await dbContext.Tickets.findById(id)
        if (!ticket) {
            throw new BadRequest('invalid id')
        }
        return ticket
    }
    async getMyTickets(accountId) {
        const tickets = dbContext.Tickets.find({ accountId })
            .populate('event')
        return tickets
    }
    async getEventTicket(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId })
            .populate('account')
        return tickets
    }
    async create(ticketData) {
        const event = await dbContext.TowerEvents.findById(ticketData.eventId)
        if (event.isCanceled) {
            throw new BadRequest('Event is Cancelled')
        }
        if (event.capacity <= 0) {
            throw new Forbidden('Event Sold Out')
        }
        // NOTE check to see if the event has capacity left as well
        const ticket = await dbContext.Tickets.create(ticketData)

        //NOTE don't forget to await and save since its affecting the server. 
        event.capacity--
        await event.save()

        await ticket.populate('event')
        await ticket.populate('account')
        return ticket
    }

    async delete(id, userId) {

        const ticket = await this.getById(id)
        if (ticket.accountId.toString() != userId) {
            throw new BadRequest('Not your ticket to delete')

        }
        //NOTE ticket had the id for event because it is a part of the event, cant create a ticket for nothing 
        const towerEvent = await dbContext.TowerEvents.findById(ticket.eventId)
        towerEvent.capacity++
        await ticket.remove()
        await towerEvent.save()
        return `Ticket deleted ${ticket}`
    }
}

export const ticketsService = new TicketsService()