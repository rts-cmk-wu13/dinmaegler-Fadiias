import { Link } from 'react-router-dom'
import './Footer.css'
import { FaLocationDot } from "react-icons/fa6";
import { IoMdPaperPlane } from "react-icons/io";
import { IoIosCall } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            {/* Logo and Description */}
            <div className="footer-section">
              <div className="footer-logo">
                <img src="../images/g1430.png" alt="Din Mægler" />
                <p className="footer-description">
                Din Mægler har været førende på det danske ejendomsmarked siden 1987. <br />
                Vi tilbyder professionel rådgivning og service til både køb og salg af boliger.
              </p>
              </div>
              
            </div>
         
            {/* Contact and Quick Links Container */}
            <div className="footer-flex-section">
              {/* Contact Information */}
              <div className="footer-section">
             
                <div className="footer-contact">
                  <div className="contact-item">
                    <FaLocationDot className="contact-icon" />
                    <p>Stændertorvet 78, 4000 Roskilde</p>
                  </div>
                  <div className="contact-item">
                    <IoIosCall className="contact-icon" />
                    <p>+45 7070 4000</p>
                  </div>
                  <div className="contact-item">
                    <IoMdPaperPlane className="contact-icon" />
                    <p>4000@dinmaegler.dk</p>
                  </div>
                  <p className="footer-tagline">Din Mægler Roskilde, er din boligibutik i lokalområdet.</p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="footer-section">
            
                <ul className="footer-links">
                        <h3>Quick Links</h3>
                  <li><Link to="/boliger">Boliger til salg</Link></li>
                  <li><Link to="/medarbejdere">Mæglere</Link></li>
                  <li><Link to="/kontakt">Kontakt os</Link></li>
                  <li><Link to="/om-os">Om os</Link></li>
             
                </ul>
              </div>
            </div>

         
          </div>
        </div>
           {/* Member Badge */}
            <div className="footer-section">
              <div className="member-badge">
        
                <img src="../images/Dansk mægler sammenslutning.png" alt="DMS Logo" className="dms-logo" />
              </div>
              
            </div>
         
      </div>
   <div className='footer-bottom' style={{ color: 'white' , textAlign: 'center', padding: '20px 0' }}>
                <p>Layout By Jit Banik 2020</p>

              </div>
      
    </footer>
  )
}

export default Footer
