import { getUserFromStorage, saveUserToStorage, clearAuth } from '../utils/auth'

describe('auth utils', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('getUserFromStorage returns null when no user', () => {
    expect(getUserFromStorage()).toBeNull()
  })

  test('saveUserToStorage and getUserFromStorage work', () => {
    const user = { id: 1, name: 'Alice' }
    saveUserToStorage(user)
    expect(getUserFromStorage()).toEqual(user)
  })

  test('getUserFromStorage returns null for malformed JSON', () => {
    localStorage.setItem('user', 'not-json')
    expect(getUserFromStorage()).toBeNull()
  })

  test('clearAuth removes user and token', () => {
    localStorage.setItem('user', JSON.stringify({ id: 2 }))
    localStorage.setItem('token', 'abc')
    clearAuth()
    expect(localStorage.getItem('user')).toBeNull()
    expect(localStorage.getItem('token')).toBeNull()
  })

  test('saveUserToStorage ignores falsy', () => {
    saveUserToStorage(null)
    expect(localStorage.getItem('user')).toBeNull()
  })

  test('getUserFromStorage returns object copy', () => {
    const user = { id: 3 }
    saveUserToStorage(user)
    const loaded = getUserFromStorage()
    expect(loaded).toEqual(user)
    expect(loaded).not.toBe(user)
  })
})

