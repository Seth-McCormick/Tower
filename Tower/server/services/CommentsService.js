import { dbContext } from "../db/DbContext"


class CommentsService {

    async getEventComments(eventId, userId) {
        // const event = await towerEventsService.getTowerEvent(eventId)
        const comments = await dbContext.Comments.find({ eventId }).populate('event')
        return comments
    }
    async create(body) {
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator', 'name picture')

        return comment
    }

}

export const commentsService = new CommentsService()