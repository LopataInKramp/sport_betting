import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Home from '../pages/Home'

test('shows login prompt when not logged in', () => {
  render(<Home isLoggedIn={false} betslip={[]} setBetslip={() => {}} />)
  expect(screen.getByText(/Please log in to place bets/i)).toBeInTheDocument()
})

test('adds to betslip only when logged in', () => {
  let betslip = []
  const setBetslip = (fn) => {
    betslip = typeof fn === 'function' ? fn(betslip) : fn
  }
  render(<Home isLoggedIn={true} betslip={betslip} setBetslip={setBetslip} />)
  const oddElements = screen.getAllByText(/2.3/)
  expect(oddElements.length).toBeGreaterThan(0)
  fireEvent.click(oddElements[0])
  // after click, betslip should have 1
  expect(betslip.length).toBe(1)
})
