import { Request, Response } from "express"

export class TodosController {

    // Depency Inyection
    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        res.status(200).json([
            { id: 1, text: 'study node', created_at: new Date() },
            { id: 2, text: 'design B&B', created_at: new Date() },
            { id: 3, text: 'fix libro de reclamaciones', created_at: new Date() },
            { id: 4, text: 'migrate Clarios', created_at: new Date() },
        ])
    }


}