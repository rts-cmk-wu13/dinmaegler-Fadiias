import { useState, useEffect } from 'react'
import { Property } from '../types'
import PropertyCard from '../components/PropertyCard'
import { FaHeart, FaTrash } from 'react-icons/fa'
import './MineFavoritter.css'

const MineFavoritter = () => {
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load favorites from localStorage
    const loadFavorites = () => {
      try {
        const storedFavorites = localStorage.getItem('favoriteProperties')
        if (storedFavorites) {
          const favorites = JSON.parse(storedFavorites)
          setFavoriteProperties(favorites)
        }
      } catch (error) {
        console.error('Error loading favorites:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFavorites()
  }, [])

  const removeFavorite = (propertyId: string) => {
    const updatedFavorites = favoriteProperties.filter(property => property.id !== propertyId)
    setFavoriteProperties(updatedFavorites)
    
    // Update localStorage
    try {
      localStorage.setItem('favoriteProperties', JSON.stringify(updatedFavorites))
    } catch (error) {
      console.error('Error updating favorites:', error)
    }
  }


  if (loading) {
    return (
      <div className="favorites-page">
        <div className="container">
          <div className="loading-message">
            <div className="loading-spinner"></div>
            <p>Indlæser favoritter...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="favorites-page">
           {/* Page Header */}  
        <div className="page-header">
          <div className="header-content">
            <div className="header-text">
              <h1>
               
             Mine favoritboliger
              </h1>
            
            </div>
           
          </div>
        </div>
      <div className="container">
     

        {/* Favorites Count */}
        <div className="favorites-count">
          <span>
            {favoriteProperties.length === 0 
              ? 'Ingen favoritter endnu' 
              : `${favoriteProperties.length} ${favoriteProperties.length === 1 ? 'favorit' : 'favoritter'}`
            }
          </span>
        </div>

        {/* Favorites Grid */}
        {favoriteProperties.length > 0 ? (
          <div className="favorites-grid">
            {favoriteProperties.map((property) => (
              <div key={property.id} className="favorite-item">
                <PropertyCard property={property} />
                <button 
                  className="remove-favorite-btn"
                  onClick={() => removeFavorite(property.id)}
                  title="Fjern fra favoritter"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-favorites">
            <div className="no-favorites-content">
              <FaHeart className="empty-heart" />
              <h2>Ingen favoritter endnu</h2>
            
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MineFavoritter
