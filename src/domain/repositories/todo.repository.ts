import { CreateTodoDto } from "../dtos";
import { UpdateTodoDto } from "../dtos/todos/update-todo.dto";
import { TodoEntity } from "../entities/todo.enetity";

export interface TodoRepository {
    create(createTodoDto: CreateTodoDto): Promise<TodoEntity>
    // TODO: paginación
    getAll(): Promise<TodoEntity[]>
    findById(id: number): Promise<TodoEntity>
    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>
    deleteById(id: number): Promise<TodoEntity>
}