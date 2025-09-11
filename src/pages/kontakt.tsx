import React, { useState } from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaLocationDot } from "react-icons/fa6";
import { IoMdPaperPlane } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import './kontakt.css'

const Kontakt = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        phone: '',
        message: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Contact form submitted:', formData)
        // Handle form submission logic here
        alert('Tak for din besked! Vi vender tilbage til dig hurtigst muligt.')

        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            phone: '',
            message: ''
        })
    }

    return (
        <div className="kontakt-page">
            {/* Hero Section */}
               <div className="page-header">
                        <h1>Kontakt os</h1>
                    </div>
                <div className="container">
            
                </div>


            <div className="container">
                <div className="kontakt-content">
                    {/* Contact Information */}


                    {/* Contact Form and Map */}
                    <div className="form-map-section">
                        {/* Contact Form */}
                        <div className="contact-form-container">
                            <h2>Send os en besked</h2>
                            <p>Udfyld formularen nedenfor, så vender vi tilbage til dig hurtigst muligt.</p>

                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Fulde navn *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Indtast dit fulde navn"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="din@email.dk"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="phone">Telefon</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+45 12 34 56 78"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="subject">Emne *</label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Vælg emne</option>
                                            <option value="boligsalg">Boligsalg</option>
                                            <option value="boligkob">Boligkøb</option>
                                            <option value="vurdering">Boligvurdering</option>
                                            <option value="investering">Investering</option>
                                            <option value="finansiering">Finansiering</option>
                                            <option value="andet">Andet</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Besked *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        placeholder="Beskriv hvordan vi kan hjælpe dig..."
                                    ></textarea>
                                </div>

                                <button type="submit" className="submit-button">
                                    Send besked
                                </button>
                            </form>
                        </div>

                        <div className="footer-contact">
                            <div className="contact-item">
                                <FaLocationDot className="contact-icon" />
                                <p>Stændertorvet 78, 4000 Roskilde</p>
                            </div>
                            <hr style={{ border: "1px solid #a3a3a334", width: "100%" }} />
                            <div className="contact-item">
                                <IoIosCall className="contact-icon" />
                                <p>+45 7070 4000</p>
                            </div>   <hr style={{ border: "1px solid #a3a3a334", width: "100%" }} />
                            <div className="contact-item">
                                <IoMdPaperPlane className="contact-icon" />
                                <p>4000@dinmaegler.dk</p>
                            </div>
                            <p className="footer-tagline">Stændertorvet 78,
                                4000 Roskilde.</p>
                        </div>
                    </div>

                    {/* Contact and Quick Links Container */}
                    <div className="footer-flex-section">
                        {/* Contact Information */}
                        <div className="footer-section">
                        </div>

                        {/* FAQ Section */}

                    </div>
                    {/* Map */}
                    <div className="map-container">
                        <h2>Find os her</h2>
                        <div className="map-wrapper">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2249.6919394552744!2d10.207748316064244!3d56.15932998068743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c3f9b8b9b9b9b%3A0x9b9b9b9b9b9b9b9b!2sN%C3%B8rregade%2023%2C%208000%20Aarhus%20C%2C%20Denmark!5e0!3m2!1sen!2sdk!4v1629000000000!5m2!1sen!2sdk"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Din Mægler Hovedkontor"
                            />
                        </div>
                    </div>
                    {/* FAQ Section */}
                    <div className="faq-section">
                        <h2>Ofte stillede spørgsmål</h2>
                        <div className="faq-grid">
                            <div className="faq-item">
                                <h3>Hvor lang tid tager det at sælge en bolig?</h3>
                                <p>Salgstiden afhænger af mange faktorer som beliggenhed, pris og markedsforhold. I gennemsnit sælges boliger på 60-90 dage, men vi arbejder målrettet for at optimere salgstiden.</p>
                            </div>
                            <div className="faq-item">
                                <h3>Hvad koster det at bruge Din Mægler?</h3>
                                <p>Vores salærer afhænger af boligens værdi og salgspris. Kontakt os for et uforpligtende tilbud tilpasset din specifikke situation.</p>
                            </div>
                            <div className="faq-item">
                                <h3>Tilbyder I også boligvurdering?</h3>
                                <p>Ja, vi tilbyder professionelle boligvurderinger. Kontakt os for at aftale et møde, hvor vi kan give dig en realistisk vurdering af din boligs værdi.</p>
                            </div>
                            <div className="faq-item">
                                <h3>Har I mæglere i hele Danmark?</h3>
                                <p>Vi har 74 butikker fordelt over hele Danmark og arbejder med erfarne lokale mæglere, der kender det lokale marked til bunds.</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="social-section">
                        <h2>Følg os på sociale medier</h2>
                        <p>Hold dig opdateret med de seneste nyheder og boligtips</p>
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
                </div>
            </div>
        </div>
    )
}

export default Kontakt
