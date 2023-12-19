import { Router } from "express"
import { TodosController } from "./crontoller"

export class TodoRoutes {
    static get routes(): Router {

        const router = Router()
        const todoController = new TodosController()

        router.get('/', todoController.getTodos)
        router.get('/:id', todoController.getTodosById)
        router.post('/', todoController.createTodo)
        router.put('/:id', todoController.updateTodo)

        return router
    }
}