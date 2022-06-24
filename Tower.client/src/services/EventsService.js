import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
class EventsService {

    async getEvents() {
        const res = await api.get('api/events')
        logger.log('events', res.data)
        AppState.events = res.data
    }

}

export const eventsService = new EventsService()