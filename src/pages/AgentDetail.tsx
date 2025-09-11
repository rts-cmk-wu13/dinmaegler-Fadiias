import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaEnvelope, FaPhone, FaTimes } from 'react-icons/fa'
import { apiService } from '../services/api'
import { Agent, Property } from '../types'
import PropertyCard from '../components/PropertyCard'
import './AgentDetail.css'

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [agent, setAgent] = useState<Agent | null>(null)
  const [agentProperties, setAgentProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Contact form states
  const [showMessageForm, setShowMessageForm] = useState(false)
  const [showCallForm, setShowCallForm] = useState(false)
  const [messageForm, setMessageForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [callForm, setCallForm] = useState({
    name: '',
    phone: '',
    preferredTime: '',
    message: ''
  })
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  // Form handlers
  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitting(true)
    
    // Simulate form submission (in real app, this would send to API)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setFormSuccess(true)
      setMessageForm({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => {
        setShowMessageForm(false)
        setFormSuccess(false)
      }, 2000)
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setFormSubmitting(false)
    }
  }

  const handleCallSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitting(true)
    
    // Simulate form submission (in real app, this would send to API)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setFormSuccess(true)
      setCallForm({ name: '', phone: '', preferredTime: '', message: '' })
      setTimeout(() => {
        setShowCallForm(false)
        setFormSuccess(false)
      }, 2000)
    } catch (error) {
      console.error('Error submitting call request:', error)
    } finally {
      setFormSubmitting(false)
    }
  }

  const handleMessageFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessageForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleCallFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCallForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    const fetchAgentAndProperties = async () => {
      if (!id) {
        setError('Agent ID not found')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        
        // Fetch all agents and find the specific one
        const agentsData = await apiService.getAgents()
        const foundAgent = agentsData.find(a => a.id.toString() === id)
        
        if (foundAgent) {
          setAgent(foundAgent)
          
          // Fetch all properties and filter by this agent
          const propertiesData = await apiService.getProperties()
          const agentProps = propertiesData.filter(property => 
            property.agent.id === foundAgent.id
          )
          setAgentProperties(agentProps)
        } else {
          setError('Agent not found')
        }
      } catch (err) {
        setError('Failed to fetch agent details')
        console.error('Error fetching agent:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAgentAndProperties()
  }, [id])

  if (loading) {
    return (
      <div className="agent-detail-page">
           {/* Header */}
       
        <div className="container">
          <div className="loading-message">
            <div className="loading-spinner"></div>
            <p>Indlæser mægler...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !agent) {
    return (
      <div className="agent-detail-page">
        <div className="container">
          <div className="error-message">
            <p>{error || 'Agent not found'}</p>
            <button onClick={() => navigate('/medarbejdere')}>Tilbage til mæglere</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="agent-detail-page">
      <div className="page-header">
        <h1>Kontakt en medarbejdere</h1>
      </div>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '20px', gap: '20px' }}>
          {/* Agent Profile */}
          <div className="agent-profile">
            <div className="agent-image-large">
              <img 
                src={agent.image?.url || '/images/default-agent.jpg'} 
                alt={agent.name} 
              />
            </div>
            <div className="agent-info-main">
              <h1>{agent.name}</h1>
              <p className="agent-title">{agent.title}</p>
              
              <div className="agent-contact-main">
                <div className="contact-item">
                  <FaEnvelope />
                  <div>
                    <label>Email:</label>
                    <a href={`mailto:${agent.email}`}>{agent.email}</a>
                  </div>
                </div>
                <div className="contact-item">
                  <FaPhone />
                  <div>
                    <label>Telefon:</label>
                    <a href={`tel:${agent.phone}`}>{agent.phone}</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Description */}
            <div className="agent-description-section">
              <h4><span style={{ fontWeight: 'bold', textDecoration: 'underline solid 2px', textUnderlineOffset: '10px' }}>Om</span> {agent.name}</h4>
              <p className="agent-description">{agent.description}</p>
            </div>
          </div>

          {/* Sidebar with Search and Contact */}
          <div style={{ minWidth: '300px' }}>
            <div style={{ backgroundColor: 'rgba(238, 247, 255, 1)', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '12px' }}>Search Property</h3>
              <input type="text" placeholder='Search...' key={agent.id} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>
        
            {/* Contact CTA */}
            <div className="contact-cta">
              <div className="cta-content">
                <h3>Interesseret i at arbejde med {agent.name}?</h3>
                <p>Kontakt {agent.name} direkte for professionel rådgivning om dit boligkøb eller -salg.</p>
                <div className="cta-buttons">
                  <button 
                    onClick={() => setShowMessageForm(true)}
                    className="cta-button primary"
                  >
                    <FaEnvelope />
                    Send besked
                  </button>
                  <button 
                    onClick={() => setShowCallForm(true)}
                    className="cta-button secondary"
                  >
                    <FaPhone />
                    Ring nu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form Modal */}
        {showMessageForm && (
          <div className="form-modal">
            <div className="form-modal-content">
              <div className="form-header">
                <h3>Send besked til {agent.name}</h3>
                <button 
                  className="close-button"
                  onClick={() => setShowMessageForm(false)}
                >
                  <FaTimes />
                </button>
              </div>
              
              {formSuccess ? (
                <div className="success-message">
                  <p>Din besked er sendt til {agent.name}!</p>
                </div>
              ) : (
                <form onSubmit={handleMessageSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Navn *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={messageForm.name}
                        onChange={handleMessageFormChange}
                        required
                        disabled={formSubmitting}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={messageForm.email}
                        onChange={handleMessageFormChange}
                        required
                        disabled={formSubmitting}
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
                        value={messageForm.phone}
                        onChange={handleMessageFormChange}
                        disabled={formSubmitting}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Emne *</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={messageForm.subject}
                        onChange={handleMessageFormChange}
                        required
                        disabled={formSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Besked *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={messageForm.message}
                      onChange={handleMessageFormChange}
                      required
                      disabled={formSubmitting}
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      type="button" 
                      onClick={() => setShowMessageForm(false)}
                      disabled={formSubmitting}
                      className="btn-secondary"
                    >
                      Annuller
                    </button>
                    <button 
                      type="submit" 
                      disabled={formSubmitting}
                      className="btn-primary"
                    >
                      {formSubmitting ? 'Sender...' : 'Send besked'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Call Form Modal */}
        {showCallForm && (
          <div className="form-modal">
            <div className="form-modal-content">
              <div className="form-header">
                <h3>Bestil opkald fra {agent.name}</h3>
                <button 
                  className="close-button"
                  onClick={() => setShowCallForm(false)}
                >
                  <FaTimes />
                </button>
              </div>
              
              {formSuccess ? (
                <div className="success-message">
                  <p>Dit opkaldsønske er sendt til {agent.name}!</p>
                  <p>Du vil blive kontaktet snarest muligt.</p>
                </div>
              ) : (
                <form onSubmit={handleCallSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="callName">Navn *</label>
                      <input
                        type="text"
                        id="callName"
                        name="name"
                        value={callForm.name}
                        onChange={handleCallFormChange}
                        required
                        disabled={formSubmitting}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="callPhone">Telefon *</label>
                      <input
                        type="tel"
                        id="callPhone"
                        name="phone"
                        value={callForm.phone}
                        onChange={handleCallFormChange}
                        required
                        disabled={formSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="preferredTime">Foretrukken tid</label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={callForm.preferredTime}
                      onChange={handleCallFormChange}
                      disabled={formSubmitting}
                    >
                      <option value="">Vælg tid...</option>
                      <option value="morning">Morgen (8-12)</option>
                      <option value="afternoon">Eftermiddag (12-17)</option>
                      <option value="evening">Aften (17-20)</option>
                      <option value="asap">Så hurtigt som muligt</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="callMessage">Besked (valgfri)</label>
                    <textarea
                      id="callMessage"
                      name="message"
                      rows={3}
                      value={callForm.message}
                      onChange={handleCallFormChange}
                      placeholder="Beskriv kort hvad du gerne vil tale om..."
                      disabled={formSubmitting}
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      type="button" 
                      onClick={() => setShowCallForm(false)}
                      disabled={formSubmitting}
                      className="btn-secondary"
                    >
                      Annuller
                    </button>
                    <button 
                      type="submit" 
                      disabled={formSubmitting}
                      className="btn-primary"
                    >
                      {formSubmitting ? 'Sender...' : 'Bestil opkald'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Agent's Properties */}
        <div className="agent-properties-section">
          <div className="section-header">
            <h2>Boliger ved {agent.name}</h2>
            <p>Se alle de boliger som {agent.name} er ansvarlig for</p>
          </div>

          {agentProperties.length === 0 ? (
            <div className="no-properties">
              <p>Ingen boliger fundet for denne mægler.</p>
            </div>
          ) : (
            <>
              <div className="properties-count">
                <p>{agentProperties.length} bolig{agentProperties.length !== 1 ? 'er' : ''} til salg</p>
              </div>
              <div className="properties-grid">
                {agentProperties.map(property => (
                  <PropertyCard 
                    key={property.id} 
                    property={property}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AgentDetail
