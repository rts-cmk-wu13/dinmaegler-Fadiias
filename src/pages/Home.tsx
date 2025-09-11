import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope } from 'react-icons/fa'
import { RiGooglePlayLine } from "react-icons/ri";
import { GrAppleAppStore } from "react-icons/gr";
import { MdOutlineEmail } from 'react-icons/md'
import { BsTelephone } from 'react-icons/bs'

import DOMPurify from 'dompurify'
import PropertyCard from '../components/PropertyCard'
import { apiService } from '../services/api'
import { Property, Agent } from '../types'
import './Home.css'

const Home = () => {
    const [properties, setProperties] = useState<Property[]>([])
    const [agents, setAgents] = useState<Agent[]>([])
    const [loading, setLoading] = useState(true)
    const [agentsLoading, setAgentsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [agentsError, setAgentsError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true)
                const data = await apiService.getProperties()
                // Get only the first 4 properties for the featured section
                setProperties(data.slice(0, 4))
            } catch (err) {
                setError('Failed to fetch properties')
                console.error('Error fetching properties:', err)
            } finally {
                setLoading(false)
            }
        }

        const fetchAgents = async () => {
            try {
                setAgentsLoading(true)
                const data = await apiService.getAgents()
                // Get only the first 3 agents for the featured section
                setAgents(data.slice(0, 3))
            } catch (err) {
                setAgentsError('Failed to fetch agents')
                console.error('Error fetching agents:', err)
            } finally {
                setAgentsLoading(false)
            }
        }

        fetchProperties()
        fetchAgents()
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Search submitted')
    }

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Newsletter signup submitted')
    }

    // Function to safely render HTML content with strict sanitization
    const createSafeMarkup = (htmlContent: string) => {
        return {
            __html: DOMPurify.sanitize(htmlContent, {
                ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'u', 'br', 'p'],
                ALLOWED_ATTR: [],
                FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'link', 'style']
            })
        }
    }

    // Example of dynamic content that might come from CMS or API
    const heroDescription = "Søg blandt <strong>158 boliger</strong> til salg i <em>74 butikker</em>"
    const aboutDescription = "It is a long established fact that a reader will be <strong>distracted</strong> by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has <em>normal distribution</em>."

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">

                    <div className="hero-content">
                        <h1>Søg efter din drømmebolig</h1>


                        <form className="search-form" onSubmit={handleSearch}>
                            <p dangerouslySetInnerHTML={createSafeMarkup(heroDescription)} />
                            <div className="search-input-group">
                                <input
                                    type="text"
                                    placeholder="Søg på fx. Ejerlejlighed i Aarhus"
                                    className="search-input"
                                />
                                <button type="submit" className="search-button">
                                    Søg
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
            {/* Info Section */}
            <section className="info-section">
                <div className="container-info">
                    <div className="info-content">
                        <h1>Vi har fulgt danskerne hjem i snart 4 årtier</h1>
                        <h3>Det synes vi siger noget om os!</h3>
                        <p dangerouslySetInnerHTML={createSafeMarkup(aboutDescription)} />
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>




                        <div style={{ display: 'flex', gap: '40px' }}>

                            <div className="info-stats">
                                <img src="./images/house 1.png" alt="" />
                                <div className="stats-text">
                                    <h3>4829</h3>
                                    <p>Boliger solgt</p>
                                </div>
                            </div>
                            <div className="info-stats">
                                <img src="./images/Group.png" alt="" />
                                <div className="stats-text">
                                    <h3>158</h3>
                                    <p>Boliger til salg</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <img src="./images/Image.png" alt="1" />
                    </div>

                </div>
                <hr style={{ border: '1px solid #eee', margin: '40px 0', width: '80%', placeSelf: 'center' }} />
                <div className='info-stats-container'>
                    <div className="info-stats">
                        <img src="./images/property 1.png" alt="" />
                        <div className="stats-text">
                            <h5>Bestil et salgstjek</h5>
                            <p>Med et Din Mægler Salgstjek
                                bliver du opdateret på værdien
                                af din bolig.</p>
                        </div>
                    </div>
                    <div className="info-stats">
                        <img src="./images/maps-and-flags 1.png" alt="" />
                        <div className="stats-text">
                            <h5>74 butikker</h5>
                            <p>Hos Din Mægler er din bolig
                                til salg i alle vores 74 butikker, som er fordelt rundt om i Danmark.</p>
                        </div>
                    </div>
                    <div className="info-stats">
                        <img src="./images/customer (1) 1.png" alt="" />
                        <div className="stats-text">
                            <h5>Tilmeld køberkartotek</h5>
                            <p>Når du er tilmeldt vores køberkartotek, bliver du kontaktet inden en ny bolig bliver annonceret.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Properties */}
            <section className="featured-properties">
                <div className="container">
                    <div className="section-header">
                        <h2>Udvalgte boliger</h2>
                        <p>There are many variations of passages of Lorem Ipsum available but the this in majority have suffered alteration in some</p>
                    </div>

                    <div className="properties-grid">
                        {loading ? (
                            <div className="loading-message">Indlæser boliger...</div>
                        ) : error ? (
                            <div className="error-message">{error}</div>
                        ) : (
                            properties.map(property => (
                                <PropertyCard key={property.id} property={property} />
                            ))
                        )}
                    </div>

                    <div className="section-footer">
                        <Link to="/boliger" className="view-all-button">
                            Se alle boliger
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter-section">
                <div className="container">
                    <div className="newsletter-content">
                        <h2 style={{ color: 'white' }}>Tilmeld dig vores nyhedsbrev og
                            hold dig opdateret på boligmarkedet</h2>
                     

                        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                            <div className="newsletter-input-group">
                                <FaEnvelope className="newsletter-icon" />
                                <input
                                    type="email"
                                    placeholder="Indtast din email adresse"
                                    className="newsletter-input"
                                    required
                                />
                            </div>
                            <button type="submit" className="newsletter-button">
                                Tilmeld
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Featured Agents */}
            <section className="featured-agents">
                <div className="container">
                    <div className="section-header">
                        <h2>Mød vores engagerede medarbejdere</h2>
                        <p>Din Mægler er garant for altid veluddannet assistance i dit boligsalg. Kontakt en af vores medarbejdere.</p>
                    </div>

                    <div className="agents-grid">
                        {agentsLoading ? (
                            <div className="loading-message">Indlæser mæglere...</div>
                        ) : agentsError ? (
                            <div className="error-message">{agentsError}</div>
                        ) : (
                            agents.map(agent => (
                                <Link key={agent.id} to={`/maegler/${agent.id}`} className="agent-card-link">
                                    <div className="agent-card">
                                        <div className="agent-image">
                                            <img 
                                                src={agent.image?.url || './images/default-agent.jpg'} 
                                                alt={agent.name} 
                                            />
                                        </div>
                                        <div className="agent-info">
                                            <h3>{agent.name}</h3>
                                            <p className="agent-title">{agent.title}</p>
                                            <div className="agent-contact">
                                                <div className="contact-item">
                                                    <MdOutlineEmail />
                                                    <span>{agent.email}</span>
                                                </div>
                                                <div className="contact-item">
                                                    <BsTelephone />
                                                    <span>{agent.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    <div className="section-footer">
                        <Link to="/medarbejdere" className="view-all-button">
                            Se alle mæglere
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section">
                <div className="container">
                    <div className="contact-content">
                        <div className="contact-text">
                            <h1>Hold dig opdateret på salgsprocessen</h1>
                            <p>Når du sælger din bolig hos Din Mægler, kommunikerer du nemt med den ansvarlige mægler eller butik med vores app. Her kan du også se statistik på interessen for din bolig i alle vores salgskanaler.</p>
                            
                            <div className="app-buttons">
                                <button className="app-button google-play-button">
                                    <div className="button-content">
                                         <RiGooglePlayLine />
                                        <span className="button-text-large">Google Play</span>
                                    </div>
                                </button>
                                <button className="app-button app-store-button">
                                    <div className="button-content">
                             
                                 <GrAppleAppStore />
                                        <span className="button-text-large">App Store</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        
                        <div className="contact-images">
                                 <img src="/images/57923 1.png" alt="Din Mægler App Screenshot 2" className="contact-image-front" />
                             <img src="/images/57923-1 1.png" alt="Din Mægler App Screenshot 1" className="contact-image-back" />
                       
                            
                           
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
