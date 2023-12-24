import { Request, Response } from "express"
import { prisma } from "../../data/postgres"


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

        const { text } = req.body

        if (!text) return res.status(400).json({ error: 'Text property is required' })

        const todo = await prisma.todo.create({
            data: { text }
        })

        res.json(todo)
    }

    public updateTodo = async (req: Request, res: Response) => {

        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

        try {
            const { text, completedAt } = req.body

            const updatedTodo = await prisma.todo.update({
                where: { id },
                data: {
                    text,
                    completedAt: (completedAt) ? new Date(completedAt) : null
                }
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