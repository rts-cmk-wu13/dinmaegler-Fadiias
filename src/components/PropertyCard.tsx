import React from 'react'
import { Link } from 'react-router-dom'
import './PropertyCard.css'
import { TbRulerMeasure2 } from "react-icons/tb";
import { GrHome } from "react-icons/gr";
import { Property } from '../types';
interface PropertyCardProps {
  property: Property
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('da-DK', {
      style: 'currency',
      currency: 'DKK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatArea = (area: number) => {
    return `${area} m²`
  }

  // Extract number of rooms and bedrooms from rooms string (e.g., "5/4" -> 5 rooms, 4 bedrooms)
  const [, bedrooms] = property.rooms.split('/').map(Number)

  return (
    <Link to={`/bolig/${property.id}`} className="property-card-link">
      <div className="property-card">
        <div className="property-image">
          <img 
            src={property.images[0]?.url || '/images/placeholder.jpg'} 
            alt={`${property.type} i ${property.city}`} 
          />
          <div className="property-price-badge">{formatPrice(property.price)}</div>
        </div>
        
        <div className="property-details">
          <h3 className="property-title">{property.adress1}</h3>
          <p className="property-address">{property.adress2}, {property.city}</p>
          
          <div className="property-info">
           <TbRulerMeasure2 />
            <span className="property-area">{formatArea(property.livingspace)}</span>
              <GrHome style={{ marginLeft: "auto" }} />
            <span className="property-rooms">{bedrooms} værelser</span>
          </div>
          
          <div className="property-agent">
            <span>Ansvarlig mægler: {property.agent.name}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}


export default PropertyCard
