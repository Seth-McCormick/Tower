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
        AppState.comment.push(res.data)
        // NOTE push into AppState
    }

    async deleteComment(commentId) {
        const res = await api.delete('api/comments/' + commentId)
        logger.log('comment deleted', res.data)
        AppState.comment = AppState.comment.filter(c => c.id != commentId)
    }

}

export const commentsService = new CommentsService()