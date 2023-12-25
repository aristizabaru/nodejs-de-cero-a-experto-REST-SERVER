import { Router } from "express"
import { TodosController } from "./controller"
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl"
import { TodoRepositoryImpl } from "../../infrastructure/repository/todo.repository.impl"

export class TodoRoutes {
    static get routes(): Router {

        const router = Router()
        const todoDatasource = new TodoDatasourceImpl()
        const todoRepository = new TodoRepositoryImpl(todoDatasource)
        const todoController = new TodosController(todoRepository)

        router.get('/', todoController.getTodos)
        router.get('/:id', todoController.getTodosById)
        router.post('/', todoController.createTodo)
        router.put('/:id', todoController.updateTodo)
        router.delete('/:id', todoController.deleteTodo)

        return router
    }
}