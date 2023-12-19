import { Request, Response } from "express"

const todos = [
    { id: 1, text: 'study node', created_at: new Date() },
    { id: 2, text: 'design B&B', created_at: new Date() },
    { id: 3, text: 'fix libro de reclamaciones', created_at: new Date() },
    { id: 4, text: 'migrate Clarios', created_at: new Date() },
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

}