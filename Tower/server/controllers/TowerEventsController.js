import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";

export class TowerEventsController extends BaseController {

    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.cancelEvent)
            .delete('/:id', this.delete)
    }

    async getAll(req, res, next) {
        try {
            const towerEvents = await towerEventsService.getAll()
            res.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }
    async getById(req, res, next) {
        try {
            const towerEvent = await towerEventsService.getTowerEvent(req.params.id)
            res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const towerEvent = await towerEventsService.createEvent(req.body)
            res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async edit(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const towerEvent = await towerEventsService.editEvent(req.params.id, req.body)
            res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(req, res, next) {
        try {
            await towerEventsService.closeEvent(req.params.id, req.userInfo.id)
            return res.send("the Event is Closed")
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const message = await towerEventsService.delete(req.params.id, req.userInfo.id)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }
}