import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import { apiService } from '../services/api'
import { Agent } from '../types'
import './Maeglere.css'

const Maeglere = () => {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true)
        const data = await apiService.getAgents()
        setAgents(data)
      } catch (err) {
        setError('Failed to fetch agents')
        console.error('Error fetching agents:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAgents()
  }, [])


  // Filter agents based on search term
  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="maeglere-page">
         {/* Header */}
        <div className="page-header">
          <h1>Medarbejdere i Roskilde</h1>
        </div>

      <div className="container">
       
  

        {/* Results Info */}
        <div className="results-info">
          <p>Viser {filteredAgents.length} mæglere af {agents.length} total</p>
        </div>

        {/* Agents Grid */}
        <div className="agents-container">
          {loading ? (
            <div className="loading-message">
              <div className="loading-spinner"></div>
              <p>Indlæser mæglere...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>Prøv igen</button>
            </div>
          ) : filteredAgents.length === 0 ? (
            <div className="no-results">
              <p>Ingen mæglere fundet med søgekriteriet "{searchTerm}".</p>
              <button onClick={() => setSearchTerm('')}>
                Ryd søgning
              </button>
            </div>
          ) : (
            <div className="agents-grid">
              {filteredAgents.map(agent => (
                <Link key={agent.id} to={`/maegler/${agent.id}`} className="agent-card-link">
                  <div className="agent-card">
                    <div className="agent-image">
                      <img 
                        src={agent.image?.url || '/images/default-agent.jpg'} 
                        alt={agent.name} 
                      />
                    </div>
                    <div className="agent-info">
                      <h3>{agent.name}</h3>
                      <p className="agent-title">{agent.title}</p>
                      <div className="agent-contact">
                        <div className="contact-item">
                          <FaEnvelope />
                          <span>{agent.email}</span>
                        </div>
                        <div className="contact-item">
                          <FaPhone />
                          <span>{agent.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Maeglere
