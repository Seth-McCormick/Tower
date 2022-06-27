import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
class EventsService {

    async getEvents() {
        const res = await api.get('api/events')
        logger.log('events', res.data)
        AppState.events = res.data
    }

    async getEvent(id) {
        const res = await api.get('api/events/' + id)
        logger.log('active event', res.data)
        AppState.activeEvent = res.data


    }
    async createEvent(eventData) {
        const res = await api.post('api/events', eventData)
        logger.log('event created', res.data)
        AppState.events.push(res.data)
        return res.data
        // return back our res.data from this method
    }

    //NOTE why does eventId have to be an object, what does being an object change????
    async createTicket(eventId) {
        const res = await api.post('api/tickets', { eventId })
        logger.log('ticket created', res.data)
        AppState.Attendee.push(res.data)
        AppState.attendingEvents.push(res.data)
    }

}

export const eventsService = new EventsService()