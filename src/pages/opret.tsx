import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaPhone } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import './opret.css'

const Opret = () => {
  const navigate = useNavigate()
  const { signup, isLoading, error, clearError, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  // Removed acceptTerms & newsletter checkboxes per request
  const [formError, setFormError] = useState<string | null>(null)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
  if (error) clearError()
  if (formError) setFormError(null)
  }

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      return 'Udfyld venligst alle påkrævede felter'
    }

    if (!formData.email.includes('@')) {
      return 'Indtast en gyldig email adresse'
    }

    if (formData.password.length < 6) {
      return 'Adgangskoden skal være mindst 6 tegn'
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Adgangskoderne er ikke ens'
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setFormError(validationError)
      return
    }

    try {
      const success = await signup({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      })

  if (success) {
        // Navigate to welcome page or home
        navigate('/')
      }
    } catch (err) {
      console.error('Signup error:', err)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="opret-page">

<div className="page-header">
          <h1 style={{ fontSize: '2rem', fontWeight: 600, fontFamily: 'quicksand' }}>Account Register</h1>
        </div>

      {/* Sign Up Container */}
      <div className="container">
        <div className="opret-card">
          {/* Header */}
          <div className="opret-header">
            <div className="logo-section">

         
            </div>
            <h2>Opret bruger hos Din Mægler</h2>
            
          </div>

          {/* Registration Form */}
          <form className="opret-form" onSubmit={handleSubmit}>
            {(error || formError) && (
              <div className="error-message">
                {formError || error}
              </div>
            )}

            {/* Name Fields */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Fornavn *</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Indtast fornavn"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Efternavn *</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Indtast efternavn"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* (Terms & newsletter checkboxes removed) */}

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
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

            {/* Phone Field */}
            <div className="form-group">
              <label htmlFor="phone">Telefon</label>
              <div className="input-wrapper">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+45 12 34 56 78"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Adgangskode *</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Mindst 6 tegn"
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

              <div className="form-group">
                <label htmlFor="confirmPassword">Gentag adgangskode *</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Gentag adgangskode"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={toggleConfirmPasswordVisibility}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
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
                  Opretter konto...
                </>
              ) : (
                'Opret konto'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>eller</span>
          </div>

          {/* Social Registration */}
          <div className="social-login">
            <button className="social-button google">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Opret med Google
            </button>
          </div>

          {/* Login Link */}
          <div className="login-link">
            <p>Har du allerede en konto? <Link to="/login">Log ind her</Link></p>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Opret
