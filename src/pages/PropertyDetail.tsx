import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { apiService } from '../services/api'
import { Property } from '../types'
import './PropertyDetail.css'
import { FaMapMarkerAlt, FaHeart, FaRegHeart, FaHome } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showFloorplan, setShowFloorplan] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isSwipping, setIsSwipping] = useState(false)

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setError('Property ID not found')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const data = await apiService.getProperties()
        const foundProperty = data.find(p => p.id.toString() === id)
        
        if (foundProperty) {
          setProperty(foundProperty)
          // Check if this property is already in favorites
          checkIfFavorite(foundProperty.id)
        } else {
          setError('Property not found')
        }
      } catch (err) {
        setError('Failed to fetch property details')
        console.error('Error fetching property:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id])

  const checkIfFavorite = (propertyId: string) => {
    try {
      const storedFavorites = localStorage.getItem('favoriteProperties')
      if (storedFavorites) {
        const favorites = JSON.parse(storedFavorites)
        const isAlreadyFavorite = favorites.some((fav: Property) => fav.id === propertyId)
        setIsFavorite(isAlreadyFavorite)
      }
    } catch (error) {
      console.error('Error checking favorites:', error)
    }
  }

  const toggleFavorite = () => {
    if (!property) return
    
    try {
      const storedFavorites = localStorage.getItem('favoriteProperties')
      let favorites = storedFavorites ? JSON.parse(storedFavorites) : []
      
      if (isFavorite) {
        // Remove from favorites
        favorites = favorites.filter((fav: Property) => fav.id !== property.id)
        setIsFavorite(false)
      } else {
        // Add to favorites
        favorites.push(property)
        setIsFavorite(true)
      }
      
      localStorage.setItem('favoriteProperties', JSON.stringify(favorites))
    } catch (error) {
      console.error('Error updating favorites:', error)
    }
  }

  const nextImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      )
    }
  }

  // Swipe handling for mobile
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    setIsSwipping(true)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsSwipping(false)
      return
    }
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextImage()
      // Add visual feedback
      const mainImage = document.querySelector('.gallery-modal .main-image')
      mainImage?.classList.add('swipe-left')
      setTimeout(() => mainImage?.classList.remove('swipe-left'), 300)
    } else if (isRightSwipe) {
      prevImage()
      // Add visual feedback
      const mainImage = document.querySelector('.gallery-modal .main-image')
      mainImage?.classList.add('swipe-right')
      setTimeout(() => mainImage?.classList.remove('swipe-right'), 300)
    }
    
    setIsSwipping(false)
  }

  if (loading) {
    return (
      <div className="property-detail-page">
        <div className="container">
          <div className="loading-message">
            <div className="loading-spinner"></div>
            <p>Indlæser bolig...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="property-detail-page">
        <div className="container">
          <div className="error-message">
            <p>{error || 'Property not found'}</p>
            <button onClick={() => navigate('/boliger')}>Tilbage til boliger</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="property-detail-page">
    
        <div  className="page-header1"
  style={{ 
    width: '100%', 
    height: '500px', 
    backgroundImage: `url(${property.images[0]?.url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'CENTER',
    backgroundRepeat: 'no-repeat'
    

  }}

>
  {/* Property Header */}
        <div className="property-header">
          <div className="property-title">
            <h1>{property.adress1}</h1>
            <p className="property-location">{property.postalcode} {property.city}</p>
          </div>
            {/* 4-Icon Thumbnail Section */}
        <div className="icon-thumbnails">
          {/* Gallery Icon */}
          <div className="icon-thumb gallery-heartbeat" onClick={() => setShowGallery(true)}>
            <div className="icon-container" >
              <GrGallery />
            </div>
          
            <span className="count">({property.images?.length || 0})</span>
          </div>

          {/* Floorplan Icon */}
          {property.floorplan && (
            <div className="icon-thumb" onClick={() => setShowFloorplan(true)}>
              <div className="icon-container">
                <FaHome />
              </div>
            
            </div>
          )}

          {/* Location Icon */}
          {property.lat && property.long && (
            <div className="icon-thumb" onClick={() => setShowMap(true)}>
              <div className="icon-container">
                <FaMapMarkerAlt />
              </div>
          
            </div>
          )}

          {/* Favorite Icon */}
          <div className={`icon-thumb favorite ${isFavorite ? 'active' : ''}`} onClick={toggleFavorite}>
            <div className="icon-container">
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </div>
            
          </div>
        </div>
          <div className="property-price">
            <span className="price">{property.price.toLocaleString()} kr</span>
          </div>
        </div>
</div>
      
      <div className="container">
  

      

         <div className="property">
              
             
              <div className="details-grid">
                <div className="detail-item">
                  <label>Sagsnummer:</label>
                  <span>{property.id}</span>
                </div>
                <div className="detail-item">
                  <label>Boligtype:</label>
                  <span>{property.type}</span>
                </div>
                <div className="detail-item">
                  <label>Boligareal:</label>
                  <span>{property.livingspace} m²</span>
                </div>
                <div className="detail-item">
                  <label>Grundareal:</label>
                  <span>{property.lotsize} m²</span>
                </div>
                <div className="detail-item">
                  <label>Rum/værelser:</label>
                  <span>{property.rooms}</span>
                </div>
                <div className="detail-item">
                  <label>Antal Plan:</label>
                  <span>{property.floors || '-'}</span>
                </div>
                <div className="detail-item">
                  <label>Kælder:</label>
                  <span>{property.basement || '-'}</span>
                </div>
                <div className="detail-item">
                  <label>Byggeår:</label>
                  <span>{property.built}</span>
                </div>
                <div className="detail-item">
                  <label>Ombygget:</label>
                  <span>{property.remodel || '-'}</span>
                </div>
                <div className="detail-item">
                  <label>Energimærke:</label>
                  <span>{property.energylabel}</span>
                </div>
                
          
           
                <div className="detail-item">
                  <label>Udbetaling:</label>
                  <span>Kr. {property.payment?.toLocaleString() || 'Ikke oplyst'}</span>
                </div>
                <div className="detail-item">
                  <label>Brutto ex ejerudgift:</label>
                  <span>Kr. {property.gross?.toLocaleString() || 'Ikke oplyst'}</span>
                </div>
                <div className="detail-item">
                  <label>Netto ex ejerudgift:</label>
                  <span>Kr. {property.netto?.toLocaleString() || 'Ikke oplyst'}</span>
                </div>
                <div className="detail-item">
                  <label>Ejerudgifter:</label>
                  <span>Kr. {property.cost?.toLocaleString() || 'Ikke oplyst'}</span>
                </div>
            
        
              

          
              </div>
            </div>
      </div>

        {/* Property Details */}
     
       
       
       
          <div className="property-info">
            <div style={{ padding: '20px', width: '28%' }}>
              <h2>Beskrivelse</h2>
              <p className="property-description">{property.description}</p>
            </div>


          {/* Agent Info */}
          <div className="agent-sidebar">
            <h3>Ansvarlig mægler</h3>
            <div className="agent-card">
              
              {property.agent ? (
                <div className="agent-info">
                  <div className="agent-image">
                    <img 
                      src={property.agent.image?.url || '/images/default-agent.jpg'} 
                      alt={property.agent.name}
                    />
                  </div>
                  <div className="agent-details">
                    <h4>{property.agent.name}</h4>
                    <p className="agent-title">{property.agent.title}</p>
                    <div className="agent-contact">
                      <p>
                        <strong>Email:</strong><br />
                        <a href={`mailto:${property.agent.email}`}>{property.agent.email}</a>
                      </p>
                      <p>
                        <strong>Telefon:</strong><br />
                        <a href={`tel:${property.agent.phone}`}>{property.agent.phone}</a>
                      </p>
                    </div>
                    <div className="agent-link">
                      <Link to={`/maegler/${property.agent.id}`} className="agent-detail-link">
                        Se mægler profil
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Ingen mægler tilknyttet</p>
              )}
          </div>
        </div>

        {/* Gallery Modal */}
        {showGallery && property?.images && property.images.length > 0 && (
          <div className="modal-overlay" onClick={() => setShowGallery(false)}>
            <div className="modal-content gallery-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowGallery(false)}>
                
              </button>
             
              <div className="gallery-container">
                <div 
                  className={`main-image ${isSwipping ? 'swiping' : ''}`}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <img 
                    src={property.images[currentImageIndex]?.url} 
                    alt={`${property.adress1} - Billede ${currentImageIndex + 1}`}
                    draggable={false}
                  />
                  {property.images.length > 1 && (
                    <>
                     
                    </>
                  )}
                </div>
                {property.images.length > 1 && (
                  <div className="image-thumbnails">
                    <div className="thumbnails-grid">
                      {property.images.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt={`Thumbnail ${index + 1}`}
                          className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Floorplan Modal */}
        {showFloorplan && property?.floorplan && (
          <div className="modal-overlay" onClick={() => setShowFloorplan(false)}>
            <div className="modal-content floorplan-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowFloorplan(false)}>
              
              </button>
          
              <img 
                src={property.floorplan.url} 
                alt="Stor plantegning af boligen"
                className="floorplan-large"
              />
            </div>
          </div>
        )}

        {/* Map Modal */}
        {showMap && property?.lat && property?.long && (
          <div className="modal-overlay" onClick={() => setShowMap(false)}>
            <div className="modal-content map-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowMap(false)}>
              
              </button>
          
              <div className="map-large">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2000!2d${property.long}!3d${property.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sdk!4v1629000000000!5m2!1sen!2sdk`}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Kort over ${property.adress1}`}
                />
                <div className="map-actions">
                  <button 
                    className="map-button"
                    onClick={() => window.open(`https://www.google.com/maps?q=${property.lat},${property.long}`, '_blank')}
                  >
                    Åbn i Google Maps
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>  )
}

export default PropertyDetail
