import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaUser, FaLock, FaEye, FaEyeSlash, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import './login.css'

const Login = () => {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  // Load remembered email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('userEmail')
    const rememberMeState = localStorage.getItem('rememberMe') === 'true'
    
    if (rememberedEmail && rememberMeState) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }))
      setRememberMe(true)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) clearError()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.email || !formData.password) {
      return
    }

    if (!formData.email.includes('@')) {
      return
    }

    try {
      const success = await login(formData.email, formData.password)
      
      if (success) {
        // Store remember me preference
        if (rememberMe) {
          localStorage.setItem('userEmail', formData.email)
          localStorage.setItem('rememberMe', 'true')
        } else {
          localStorage.removeItem('userEmail')
          localStorage.removeItem('rememberMe')
        }
        
        // Navigate to home or intended page
        navigate('/')
      }
    } catch (err) {
      // Error is handled by the auth context
      console.error('Login error:', err)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="login-page">
      <div className="page-header">
          <h1 style={{ fontSize: '2rem', fontWeight: 600 }}>Account Login</h1>
      </div>
      
      {/* Login Container */}
      <div className="container">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <h2>Log ind på din konto</h2>
          </div>

          {/* Login Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="din@email.dk"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Adgangskode</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Indtast din adgangskode"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <span className="checkmark"></span>
                Husk mig
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Glemt adgangskode?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`submit-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Logger ind...
                </>
              ) : (
                'Log ind'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>eller</span>
          </div>

          {/* Social Media */}
          <div className="social-section">
            <div className="social-links">
              <a href="#" className="social-link facebook">
                <FaFacebookF />
                <span>Facebook</span>
              </a>
              <a href="#" className="social-link instagram">
                <FaInstagram />
                <span>Instagram</span>
              </a>
              <a href="#" className="social-link linkedin">
                <FaLinkedinIn />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
          
          {/* Sign Up Link */}
          <div className="signup-link">
            <p>Har du ikke en konto? <Link to="/signup">Opret bruger</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
