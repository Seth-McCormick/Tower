import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"


class CommentsService {

    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId })
            .populate('event')
            .populate('creator')
        return comments
    }
    async create(body) {
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator', 'name picture')

        return comment
    }

    async deleteComment(id, userId) {
        const comment = await dbContext.Comments.findById(id)
        if (comment.creatorId.toString() != userId) {
            throw new Forbidden('Not your Comment to Delete')
        }
        await comment.remove()
        return 'Comment Deleted'
    }

}

export const commentsService = new CommentsService()