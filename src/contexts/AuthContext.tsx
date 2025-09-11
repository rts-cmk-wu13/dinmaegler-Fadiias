import React, { createContext, useContext, useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_AUTH_API || 'http://localhost:4000'

// Types for authentication
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  createdAt: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: SignupData) => Promise<boolean>
  logout: () => void
  error: string | null
  clearError: () => void
}

export interface SignupData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  password: string
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Restore session via token
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('authToken')
      if (!token) { setIsLoading(false); return }
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
            setUser(data.user)
        } else {
          localStorage.removeItem('authToken')
        }
      } catch (e) {
        console.error('Session restore failed', e)
      } finally {
        setIsLoading(false)
      }
    }
    init()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true); setError(null)
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Login fejlede'); return false }
      localStorage.setItem('authToken', data.token)
      setUser(data.user)
      return true
    } catch (e) {
      setError('Serverfejl under login')
      return false
    } finally { setIsLoading(false) }
  }

  const signup = async (userData: SignupData): Promise<boolean> => {
    setIsLoading(true); setError(null)
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Oprettelse fejlede'); return false }
      localStorage.setItem('authToken', data.token)
      setUser(data.user)
      return true
    } catch (e) {
      setError('Serverfejl under oprettelse')
      return false
    } finally { setIsLoading(false) }
  }

  const logout = async () => {
    const token = localStorage.getItem('authToken')
    if (token) {
      try { await fetch(`${API_BASE}/auth/logout`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } }) } catch {}
    }
    setUser(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('rememberMe')
  }

  const clearError = () => {
    setError(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    error,
    clearError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
