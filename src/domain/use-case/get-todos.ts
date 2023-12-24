import { UpdateTodoDto } from "../dto";
import { TodoEntity } from "../entity/todo.enetity";
import { TodoRepository } from "../repository/todo.repository";

export interface GetTodosUseCase {
    execute(): Promise<TodoEntity[]>
}

export class GetTodos implements GetTodosUseCase {

    constructor(
        private readonly repository: TodoRepository
    ) { }

    execute(): Promise<TodoEntity[]> {
        return this.repository.getAll()
    }

}