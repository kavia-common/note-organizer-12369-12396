type User = { id: string; email: string }

// PUBLIC_INTERFACE
export function useAuth() {
  /**
   * Authentication composable (mock).
   * Persists session in localStorage under 'notes_auth'.
   * Provides: isAuthenticated, user, login, signup, logout.
   */
  const auth = useState<User | null>('auth:user', () => null)
  const isAuthenticated = computed(() => !!auth.value)

  onMounted(() => {
    try {
      const raw = localStorage.getItem('notes_auth')
      if (raw) auth.value = JSON.parse(raw)
    } catch {}
  })

  function persist() {
    if (auth.value) localStorage.setItem('notes_auth', JSON.stringify(auth.value))
    else localStorage.removeItem('notes_auth')
  }

  // PUBLIC_INTERFACE
  function login(email: string, _password: string) {
    /** Authenticate user (mock). Accepts any non-empty email/password. */
    if (!email || !_password) throw new Error('Email and password are required')
    const user: User = { id: cryptoRandom(), email }
    auth.value = user
    persist()
    return user
  }

  // PUBLIC_INTERFACE
  function signup(email: string, password: string) {
    /** Signup behaves like login in mock implementation. */
    return login(email, password)
  }

  // PUBLIC_INTERFACE
  function logout() {
    /** Clears auth state and storage. */
    auth.value = null
    persist()
  }

  return { isAuthenticated, user: auth, login, signup, logout }
}

function cryptoRandom() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    // @ts-ignore
    return crypto.randomUUID()
  }
  return 'id-' + Math.random().toString(36).slice(2)
}
