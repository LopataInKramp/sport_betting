export function addBet(betslip, bet) {
  if (!bet || typeof bet.stake !== 'number' || bet.stake <= 0) {
    throw new Error('Invalid bet')
  }
  return [...betslip, bet]
}

export function removeBet(betslip, index) {
  if (index < 0 || index >= betslip.length) throw new Error('Index out of range')
  return betslip.filter((_, i) => i !== index)
}

export function calculateTotal(betslip) {
  return betslip.reduce((sum, b) => sum + (b.stake || 0), 0)
}

