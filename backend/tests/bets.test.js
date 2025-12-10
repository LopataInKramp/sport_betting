import request from 'supertest'
import express from 'express'

const mockPool = {
  query: vi.fn(async (sql, params) => {
    if (sql.startsWith('INSERT INTO bets')) {
      return { rows: [{ id: 'b1', user_id: params[0], match_name: params[1], outcome: params[2], odds: params[3], amount: params[4] }] }
    }
    if (sql.startsWith('SELECT * FROM bets')) {
      return { rows: [{ id: 'b1', user_id: params[0] }] }
    }
    return { rows: [] }
  }),
}

vi.mock('../db.js', () => ({ default: mockPool }))

let app
beforeEach(async () => {
  app = express()
  app.use(express.json())
  const bets = (await import('../routs/bets.js')).default
  app.use('/api/bets', bets)
})

test('add bet responds with created bet', async () => {
  const res = await request(app).post('/api/bets').send({ userId: 'u1', matchName: 'm', outcome: 'o', odds: 2.5, amount: 10 })
  expect(res.status).toBe(200)
  expect(res.body).toHaveProperty('id')
  expect(res.body).toHaveProperty('user_id', 'u1')
})

test('get bets returns array', async () => {
  const res = await request(app).get('/api/bets/u1')
  expect(res.status).toBe(200)
  expect(Array.isArray(res.body)).toBe(true)
})
