const SESSION_KEY = 'namma.demo.session'

export const DEMO_ACCOUNT = {
  email: 'neighbor@namma.demo',
  password: 'Neighbor123!',
  name: 'Demo Neighbor',
}

export function getDemoUser() {
  const savedUser = window.localStorage.getItem(SESSION_KEY)
  if (!savedUser) return null

  try {
    const user = JSON.parse(savedUser)
    if (typeof user?.name === 'string' && typeof user?.email === 'string') {
      return user
    }
  } catch (error) {
    console.error('Could not read the local demo session.', error)
  }

  window.localStorage.removeItem(SESSION_KEY)
  return null
}

export function signInDemoUser(email, password) {
  if (
    email.trim().toLowerCase() !== DEMO_ACCOUNT.email ||
    password !== DEMO_ACCOUNT.password
  ) {
    return false
  }

  window.localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ name: DEMO_ACCOUNT.name, email: DEMO_ACCOUNT.email }),
  )
  return true
}

export function signOutDemoUser() {
  window.localStorage.removeItem(SESSION_KEY)
}
