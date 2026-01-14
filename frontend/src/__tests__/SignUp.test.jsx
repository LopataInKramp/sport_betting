import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SignUp from '../pages/SignUp'

test('validates signup form fields', () => {
  render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>
  )
  fireEvent.click(screen.getByRole('button', { name: /Sign up/i }))
  expect(screen.getByText(/Name is required/i)).toBeInTheDocument()
  expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
  expect(screen.getByText(/Password is required/i)).toBeInTheDocument()
})

test('shows invalid email and short password errors', () => {
  render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>
  )
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'bad-email' } })
  fireEvent.change(screen.getByLabelText('Password', { exact: true }), { target: { value: '123' } })
  fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: '1234' } })
  fireEvent.click(screen.getByRole('button', { name: /Sign up/i }))
  expect(screen.getByText(/Email is invalid/i)).toBeInTheDocument()
  expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument()
  expect(screen.getByText(/Passwords don't match/i)).toBeInTheDocument()
})
