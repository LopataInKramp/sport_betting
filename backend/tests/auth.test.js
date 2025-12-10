import request from 'supertest'
import express from 'express'

// mock pool to avoid real DB
const mockPool = {
  query: vi.fn(async (sql, params) => {
    if (sql.includes('SELECT * FROM users WHERE name')) {
      if (params[0] === 'good' && params[1] === 'pass') {
        return { rows: [{ id: '1', name: 'good', password: 'pass', balance: 100 }] }
      }
      return { rows: [] }
    }
    return { rows: [] }
  }),
}

vi.mock('../db.js', () => ({ default: mockPool }))

let app
beforeEach(async () => {
  app = express()
  app.use(express.json())
  const { default: routes } = await import('../routs/auth.js')
  app.use('/api/auth', routes)
})

test('login fails for bad creds', async () => {
  const res = await request(app).post('/api/auth/login').send({ name: 'bad', password: 'x' })
  expect(res.status).toBe(400)
})

test('login succeeds for good creds', async () => {
  process.env.JWT_SECRET = 'test'
  const res = await request(app).post('/api/auth/login').send({ name: 'good', password: 'pass' })
  expect(res.status).toBe(200)
  expect(res.body).toHaveProperty('token')
  expect(res.body.user).toHaveProperty('name', 'good')
})
