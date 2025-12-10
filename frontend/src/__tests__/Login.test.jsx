import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Login from '../pages/Login'

beforeEach(() => {
  if (global.fetch && global.fetch.resetMocks) global.fetch.resetMocks()
  localStorage.clear()
})

test('shows validation error when fields missing', () => {
  const onLogin = vi.fn()
  render(
    <MemoryRouter>
      <Login onLogin={onLogin} isLoggedIn={false} />
    </MemoryRouter>
  )
  const btn = screen.getByRole('button', { name: /Login/i })
  fireEvent.click(btn)
  expect(screen.getByText(/Please enter username or password/i)).toBeInTheDocument()
})

test('submits and stores token on successful login', async () => {
  const mockResp = { token: 't', user: { id: 1, name: 'u' } }
  global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockResp) }))
  const onLogin = vi.fn()
  render(
    <MemoryRouter>
      <Login onLogin={onLogin} isLoggedIn={false} />
    </MemoryRouter>
  )
  fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'u' } })
  fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'p' } })
  fireEvent.click(screen.getByRole('button', { name: /Login/i }))
  await waitFor(() => expect(onLogin).toHaveBeenCalled())
  expect(localStorage.getItem('token')).toBe('t')
})
