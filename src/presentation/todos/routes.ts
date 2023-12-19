import { Router } from "express"
import { TodosController } from "./crontoller"

export class TodoRoutes {
    static get routes(): Router {

        const router = Router()
        const todoController = new TodosController()

        router.get('/api/v1/todos', todoController.getTodos)

        return router
    }
}