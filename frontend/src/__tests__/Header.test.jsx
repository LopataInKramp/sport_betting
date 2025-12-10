import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../components/Header'

test('shows signup/login when not logged in', () => {
  const handleLogout = vi.fn()
  render(
    <MemoryRouter>
      <Header isLoggedIn={false} handleLogout={handleLogout} />
    </MemoryRouter>
  )
  expect(screen.getByText(/Sign Up/i)).toBeInTheDocument()
  expect(screen.getByText(/Login/i)).toBeInTheDocument()
})

test('shows account and logout when logged in and calls logout', () => {
  const handleLogout = vi.fn()
  render(
    <MemoryRouter>
      <Header isLoggedIn={true} handleLogout={handleLogout} />
    </MemoryRouter>
  )
  expect(screen.getByText(/Account/i)).toBeInTheDocument()
  const logoutBtn = screen.getByText(/Logout/i)
  fireEvent.click(logoutBtn)
  expect(handleLogout).toHaveBeenCalled()
})
