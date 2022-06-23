import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class TowerEventsService {

    async getAll() {
        const Events = await dbContext.TowerEvents.find()
        return Events
    }

    async getTowerEvent(id) {
        const Event = await dbContext.TowerEvents.findById(id)
        if (!Event) {
            throw new BadRequest('not the right event')

        }
        return Event
    }

    async createEvent(body) {
        const Event = await dbContext.TowerEvents.create(body)
        await Event.populate('creator', 'name picture')
        return Event
    }

    async editEvent(id, eventData) {
        const original = await dbContext.TowerEvents.findById(id).populate('creator', 'name picture')
        if (original.creatorId.toString() != eventData.creatorId) {
            throw new BadRequest('Not your Event')
        }
        if (original.isCanceled = true) {
            throw new BadRequest('Event Cancelled')
        }
        original.name = eventData.name ? eventData.name : original.name
        original.description = eventData.description ? eventData.description : original.description
        original.coverImg = eventData.coverImg ? eventData.coverImg : original.coverImg
        original.location = eventData.location ? eventData.location : original.location
        original.capacity = eventData.capacity ? eventData.capacity : original.capacity
        original.startDate = eventData.startDate ? eventData.startDate : original.startDate
        // original.isCanceled = eventData.isCanceled ? eventData.isCanceled : original.isCanceled // NO!!!!!!!!
        await original.save()
        return original
    }

    async closeEvent(id, userId) {
        const event = await dbContext.TowerEvents.findById(id)
        if (event.creatorId.toString() != userId) {
            throw new BadRequest("You don't have permission to delete that")
        }
        event.isCanceled = true
        await event.save()
    }

    async delete(id, userId) {
        const event = await dbContext.TowerEvents.findById(id)
        if (event.creatorId.toString() != event.userId) {
            throw new BadRequest('Not your Event to Delete')
        }
        await event.remove()
        return `Event Deleted ${event.name}`
    }
}

export const towerEventsService = new TowerEventsService()