import request from 'supertest'
import { testServer } from '../../test-server'
import { prisma } from '../../../src/data/postgres'
import exp from 'constants'
import { text } from 'stream/consumers'

describe('testing TODO routes - routes.ts', () => {

    beforeAll(async () => {
        await testServer.start()
    })

    afterAll(async () => {
        await prisma.todo.deleteMany()
        testServer.close()
    })

    beforeEach(async () => {
        await prisma.todo.deleteMany()
    })

    const todo1 = { text: 'Hola Mundo 1' }
    const todo2 = { text: 'Hola Mundo 2' }

    test('should return TODO\'s /api/v1/todos', async () => {

        await prisma.todo.createMany({
            data: [todo1, todo2]
        })

        const { body } = await request(testServer.app)
            .get('/api/v1/todos')
            .expect(200)

        expect(body).toBeInstanceOf(Array)
        expect(body.length).toBe(2)
        expect(body[0].text).toBe(todo1.text)
        expect(body[1].text).toBe(todo2.text)
    })

    test('should return a TODO /api/v1/todos/:id', async () => {

        const todo = await prisma.todo.create({
            data: todo1
        })

        const { body } = await request(testServer.app)
            .get(`/api/v1/todos/${todo.id}`)
            .expect(200)

        expect(body).toBeInstanceOf(Object)
        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
            completedAt: todo.completedAt
        })
    })

    test('should return a 404 Not Found /api/v1/todos/:id', async () => {

        const todoId = 999
        const { body } = await request(testServer.app)
            .get(`/api/v1/todos/${todoId}`)
            .expect(404)

        expect(body).toEqual({ error: `TODO with id ${todoId} not found` })
    })

    test('should return a new TODO /api/v1/todos', async () => {

        const { body } = await request(testServer.app)
            .post(`/api/v1/todos`)
            .send(todo1)
            .expect(201)

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: null
        })

    })

    test('should return a error if text is not present /api/v1/todos', async () => {

        const { body } = await request(testServer.app)
            .post(`/api/v1/todos`)
            .send({})
            .expect(400)

        expect(body).toEqual({ error: 'Text property is required' })

    })

    test('should return a error if text is empty /api/v1/todos', async () => {

        const { body } = await request(testServer.app)
            .post(`/api/v1/todos`)
            .send({ text: '' })
            .expect(400)

        expect(body).toEqual({ error: 'Text property is required' })

    })

    test('should return an updated TODO /api/v1/todos/:id', async () => {

        const todo = await prisma.todo.create({
            data: todo1
        })

        const { body } = await request(testServer.app)
            .put(`/api/v1/todos/${todo.id}`)
            .send({
                text: 'Hola Mundo UPDATE',
                completedAt: '2023-10-21'
            })
            .expect(200)

        expect(body).toEqual({
            id: todo.id,
            text: 'Hola Mundo UPDATE',
            completedAt: '2023-10-21T00:00:00.000Z'
        })

    })

    test('should return 404 if TODO Not Found /api/v1/todos/:id', async () => {

        const todoId = 999

        const { body } = await request(testServer.app)
            .put(`/api/v1/todos/${todoId}`)
            .send({
                text: 'Hola Mundo UPDATE',
                completedAt: '2023-10-21'
            })
            .expect(404)

        expect(body).toEqual({ error: 'TODO with id 999 not found' })
    })

    test('should return an updated TODO, but only the date /api/v1/todos/:id', async () => {

        const todo = await prisma.todo.create({
            data: todo1
        })

        const { body } = await request(testServer.app)
            .put(`/api/v1/todos/${todo.id}`)
            .send({
                completedAt: '2023-10-21'
            })
            .expect(200)

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: '2023-10-21T00:00:00.000Z'
        })

    })

    test('should delete a TODO /api/v1/todos/:id', async () => {

        const todo = await prisma.todo.create({
            data: todo1
        })

        const { body } = await request(testServer.app)
            .delete(`/api/v1/todos/${todo.id}`)
            .expect(200)

        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
            completedAt: null
        })

    })

    test('should return a 404 if TODO do not exist /api/v1/todos/:id', async () => {

        const todoId = 999

        const { body } = await request(testServer.app)
            .delete(`/api/v1/todos/${todoId}`)
            .expect(404)

        expect(body).toEqual({
            error: `TODO with id ${todoId} not found`
        })

    })

})


