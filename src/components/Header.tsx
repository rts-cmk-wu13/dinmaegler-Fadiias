import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Header.css'
import { FaPaperPlane } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { CiUser } from "react-icons/ci";


const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout()
    } else {
      navigate('/login')
    }
  }

  return (
    <header className="header">
      {/* Top contact bar */}
      <div className="header-top">
        <div className="container">
          <div className="header-contact">
            <span><FaPaperPlane />4000@dinmaegler.dk</span>
            <span><BsFillTelephoneFill />+45 7070 4000</span>
              {/* Auth Button */}
           
              <button 
              className="auth-button"
              onClick={handleAuthClick}
            >
              <CiUser style={{ fontSize: '21px' }} />
              {isAuthenticated 
                ? `${user?.firstName || user?.email?.split('@')[0] || 'Bruger'} - Log ud`
                : 'Log ind'
              }
            </button>

          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="header-main">
        <div className="container">
          <nav className="header-nav">
            {/* Logo */}
            <Link to="/" className="header-logo">
              <img src="../images/g1430.png" alt="Din Mægler" />
            </Link>

            {/* Desktop Navigation */}
            <ul className="nav-menu">
              <li>
                <Link to="/boliger" className="nav-link">
                  Boliger til salg
                </Link>
              </li>
              <li>
                <Link to="/medarbejdere" className="nav-link">
                  Mæglere
                </Link>
              </li>
             
              {isAuthenticated && (
                <li>
                  <Link to="/favoritter" className="nav-link">
                    Mine favoritter
                  </Link>
                </li>
              )}
            
              <li>
                <Link to="/kontakt" className="nav-link">
                  Kontakt os
                </Link>
              </li>
            </ul>

          
            {/* Mobile menu button */}
            <button 
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </nav>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="mobile-menu">
              <Link 
                to="/boliger" 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Boliger til salg
              </Link>
              <Link 
                to="/medarbejdere" 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Mæglere
              </Link>
              {isAuthenticated && (
                <Link 
                  to="/favoritter" 
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mine favoritter
                </Link>
              )}
              <Link 
                to="/kontakt" 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontakt os
              </Link>
              <button 
                className="mobile-auth-button"
                onClick={() => {
                  handleAuthClick()
                  setMobileMenuOpen(false)
                }}
              >
                {isAuthenticated 
                  ? `${user?.firstName || user?.email?.split('@')[0] || 'Bruger'} - Log ud`
                  : 'Log ind'
                }
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
