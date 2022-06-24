import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {

    async getEventComments(id) {
        const res = await api.get(`api/events/${id}/comments`)
        logger.log('event comments', res.data)
        AppState.comment = res.data
    }
    async createComment(commentData) {
        const res = await api.post('api/comments', commentData)
        logger.log('comment created', res.data)
    }

}

export const commentsService = new CommentsService()