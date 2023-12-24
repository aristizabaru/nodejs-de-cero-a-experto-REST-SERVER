import { CreateTodoDto } from "../dto";
import { TodoEntity } from "../entity/todo.enetity";
import { TodoRepository } from "../repository/todo.repository";

export interface CreateTodoUseCase {
    execute(dto: CreateTodoDto): Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoUseCase {

    constructor(
        private readonly repository: TodoRepository
    ) { }

    execute(dto: CreateTodoDto): Promise<TodoEntity> {
        return this.repository.create(dto)
    }

}