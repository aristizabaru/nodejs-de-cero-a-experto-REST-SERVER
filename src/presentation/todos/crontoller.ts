import { Request, Response } from "express"

interface Todo {
    id: number
    text: string
    completedAt: Date | null
}

const todos: Todo[] = [
    { id: 1, text: 'study node', completedAt: new Date() },
    { id: 2, text: 'design B&B', completedAt: new Date() },
    { id: 3, text: 'fix libro de reclamaciones', completedAt: new Date() },
    { id: 4, text: 'migrate Clarios', completedAt: new Date() },
]

export class TodosController {

    // Depency Inyection
    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        res.status(200).json(todos)
    }

    public getTodosById = (req: Request, res: Response) => {
        const id = +req.params.id

        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

        const todo = todos.filter(todo => todo.id === id)

        todo.length
            ? res.json(todo)
            : res.status(404).json({ error: `TODO with id ${id} not found` })
    }

    public createTodo = (req: Request, res: Response) => {

        const { text } = req.body

        if (!text) return res.status(400).json({ error: 'Text property is required' })

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: new Date()
        }

        todos.push(newTodo)

        res.json(newTodo)
    }

    public updateTodo = (req: Request, res: Response) => {

        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

        const todo = todos.find(todo => todo.id === id)
        if (!todo) return res.status(404).json({ error: `TODO with id ${id} not found` })

        const { text, completedAt } = req.body

        todo.text = text || todo.text

        completedAt === 'null'
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt)

        res.json(todo)
    }

    public deleteTodo = (req: Request, res: Response) => {

        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

        const todo = todos.find(todo => todo.id === id)
        if (!todo) return res.status(404).json({ error: `TODO with id ${id} not found` })

        todos.splice(todos.indexOf(todo), 1)

        res.json(todo)

    }

}