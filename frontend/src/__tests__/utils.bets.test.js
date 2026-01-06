import { addBet, removeBet, calculateTotal } from '../utils/bets'

describe('bets utils', () => {
  test('addBet adds valid bet', () => {
    const b = [{ stake: 10 }]
    const newBet = { stake: 5 }
    expect(addBet(b, newBet)).toEqual([{ stake: 10 }, { stake: 5 }])
  })

  test('addBet throws for invalid stake', () => {
    expect(() => addBet([], { stake: 0 })).toThrow()
    expect(() => addBet([], { stake: -1 })).toThrow()
    expect(() => addBet([], {})).toThrow()
  })

  test('removeBet removes by index', () => {
    const b = [{ stake: 1 }, { stake: 2 }, { stake: 3 }]
    expect(removeBet(b, 1)).toEqual([{ stake: 1 }, { stake: 3 }])
  })

  test('removeBet throws for bad index', () => {
    expect(() => removeBet([{ stake: 1 }], 2)).toThrow()
    expect(() => removeBet([], 0)).toThrow()
  })

  test('calculateTotal sums stakes', () => {
    const b = [{ stake: 2 }, { stake: 3 }, { stake: 0 }]
    expect(calculateTotal(b)).toBe(5)
  })

  test('calculateTotal handles empty', () => {
    expect(calculateTotal([])).toBe(0)
  })
})

