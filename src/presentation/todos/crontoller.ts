import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto } from "../../domain/dtos"
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto"


export class TodosController {

    // Depency Inyection
    constructor() { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany()

        res.status(200).json(todos)
    }

    public getTodosById = async (req: Request, res: Response) => {
        const id = +req.params.id

        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

        const todo = await prisma.todo.findUnique({
            where: { id }
        })

        todo
            ? res.json(todo)
            : res.status(404).json({ error: `TODO with id ${id} not found` })
    }

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body)

        if (error) return res.status(400).json({ error })
        console.log(createTodoDto!.values)
        console.log(createTodoDto)

        const todo = await prisma.todo.create({
            data: createTodoDto!.values.text
        })

        res.json(todo)
    }

    public updateTodo = async (req: Request, res: Response) => {

        const id = +req.params.id

        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })
        if (error) return res.status(400).json({ error })

        try {
            const { text, completedAt } = req.body

            const updatedTodo = await prisma.todo.update({
                where: { id: updateTodoDto!.id },
                data: updateTodoDto!.values
            })

            res.json(updatedTodo)
        } catch (error) {
            res.status(404).json({ error: `TODO with id ${id} not found` })
        }
    }

    public deleteTodo = async (req: Request, res: Response) => {

        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

        try {
            const todo = await prisma.todo.delete({
                where: { id },
            })

            res.json(todo)
        } catch (error) {
            res.status(404).json({ error: `TODO with id ${id} not found` })
        }

    }

}