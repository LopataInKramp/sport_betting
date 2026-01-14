export function getUserFromStorage() {
  const raw = localStorage.getItem('user')
  try {
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveUserToStorage(user) {
  if (!user) return
  localStorage.setItem('user', JSON.stringify(user))
}

export function clearAuth() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

