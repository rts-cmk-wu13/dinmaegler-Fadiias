import React, { useState, useEffect } from 'react'
import { apiService } from '../services/api'
import { Property } from '../types'
import PropertyCard from '../components/PropertyCard'
import './Boliger.css'

const Boliger = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [sortBy] = useState('price')
  const [maxPrice, setMaxPrice] = useState(12000000)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const data = await apiService.getProperties()
        setProperties(data)
      } catch (err) {
        setError('Failed to fetch properties')
        console.error('Error fetching properties:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  // Filter and sort properties
  const filteredAndSortedProperties = properties
    .filter(property => {
      const matchesSearch = property.adress1.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.type.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === '' || property.type === filterType
      
      // Price range filtering
      const matchesPriceRange = property.price <= maxPrice
      
      return matchesSearch && matchesType && matchesPriceRange
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'livingspace':
          return a.livingspace - b.livingspace
        case 'livingspace-desc':
          return b.livingspace - a.livingspace
        case 'city':
          return a.city.localeCompare(b.city)
        default:
          return 0
      }
    })

  // Get unique property types for filter
  const propertyTypes = [...new Set(properties.map(p => p.type))]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="boliger-page">
        <div className="page-header">
          <h1>Boliger til salg</h1>
        </div>
      <div className="container">
        {/* Header */}
      

        {/* Search and Filters */}
        <div className="search-filters">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-group">
              <input
                type="text"
                placeholder="Søg på adresse, by eller boligtype..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                Søg
              </button>
            </div>
          </form>

          <div className="filters">
            <div className="price-range-filter">
              <label>Maksimal pris:</label>
              <div className="range-slider-container">
                <input
                  type="range"
                  min="0"
                  max="12000000"
                  step="100000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="range-slider"
                />
                <div className="range-values">
                  <span>0 kr</span>
                  <span>-</span>
                  <span>{maxPrice.toLocaleString()} kr</span>
                </div>
              </div>
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="">Alle boligtyper</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <p>Viser {filteredAndSortedProperties.length} boliger af {properties.length} total</p>
        </div>

        {/* Properties Grid */}
        <div className="properties-container">
          {loading ? (
            <div className="loading-message">
              <div className="loading-spinner"></div>
              <p>Indlæser boliger...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>Prøv igen</button>
            </div>
          ) : filteredAndSortedProperties.length === 0 ? (
            <div className="no-results">
              <p>Ingen boliger fundet med de valgte kriterier.</p>
              <button onClick={() => {
                setSearchTerm('')
                setFilterType('')
                setMaxPrice(12000000)
              }}>
                Ryd filtre
              </button>
            </div>
          ) : (
            <div className="properties-grid">
              {filteredAndSortedProperties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Boliger
