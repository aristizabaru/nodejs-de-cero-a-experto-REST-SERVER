import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity } from "../../domain";
import { UpdateTodoDto } from "../../domain/dto/todos/update-todo.dto";

export class TodoDatasourceImpl implements TodoDatasource {
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        return TodoEntity.fromObject(todo)
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany()

        return todos.map(todo => TodoEntity.fromObject(todo))
    }
    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({
            where: { id }
        })
        if (!todo) throw `TODO with id ${id} not found`

        return TodoEntity.fromObject(todo)

    }
    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        this.findById(updateTodoDto.id)
        const updatedTodo = await prisma.todo.update({
            where: { id: updateTodoDto!.id },
            data: updateTodoDto!.values
        })

        return TodoEntity.fromObject(updatedTodo)
    }
    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id)

        const deleted = await prisma.todo.delete({
            where: { id },
        })
        return TodoEntity.fromObject(deleted)
    }

}