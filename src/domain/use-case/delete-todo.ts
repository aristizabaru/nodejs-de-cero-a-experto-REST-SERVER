import { TodoEntity } from "../entity/todo.enetity";
import { TodoRepository } from "../repository/todo.repository";

export interface DeleteTodoUseCase {
    execute(id: number): Promise<TodoEntity>
}

export class DeleteTodo implements DeleteTodoUseCase {

    constructor(
        private readonly repository: TodoRepository
    ) { }

    execute(id: number): Promise<TodoEntity> {
        return this.repository.deleteById(id)
    }

}