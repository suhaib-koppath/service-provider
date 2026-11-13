const SESSION_KEY = 'namma.admin.demo.session'

export const DEMO_ADMIN_ACCOUNT = {
  email: 'admin@namma.demo',
  password: 'NammaAdmin123!',
  name: 'Namma Admin',
  role: 'Admin',
}

export function getAdminSession() {
  const savedSession = window.localStorage.getItem(SESSION_KEY)
  if (!savedSession) return null

  try {
    const session = JSON.parse(savedSession)
    if (session?.role === 'Admin' && typeof session.email === 'string') return session
  } catch (error) {
    console.error('Could not read the local demo admin session.', error)
  }

  window.localStorage.removeItem(SESSION_KEY)
  return null
}

export function signInDemoAdmin(email, password) {
  if (
    email.trim().toLowerCase() !== DEMO_ADMIN_ACCOUNT.email ||
    password !== DEMO_ADMIN_ACCOUNT.password
  ) {
    return false
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify({
    email: DEMO_ADMIN_ACCOUNT.email,
    name: DEMO_ADMIN_ACCOUNT.name,
    role: DEMO_ADMIN_ACCOUNT.role,
  }))
  return true
}

export function signOutDemoAdmin() {
  window.localStorage.removeItem(SESSION_KEY)
}
