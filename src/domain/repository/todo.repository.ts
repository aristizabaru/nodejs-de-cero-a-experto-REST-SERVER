import { CreateTodoDto } from "../dto";
import { UpdateTodoDto } from "../dto/todos/update-todo.dto";
import { TodoEntity } from "../entity/todo.enetity";

export interface TodoRepository {
    create(createTodoDto: CreateTodoDto): Promise<TodoEntity>
    // TODO: paginación
    getAll(): Promise<TodoEntity[]>
    findById(id: number): Promise<TodoEntity>
    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>
    deleteById(id: number): Promise<TodoEntity>
}