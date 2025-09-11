import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound: React.FC = () => {
  return (
    <div className="notfound-page">
      <div className="notfound-content container">
        <div className="notfound-code">HOV <span style={{ textShadow: '0 0 5px lightskyblue', fontFamily: 'fantasy' }}>!</span> </div>
        <h1>Du er havnet på en side som ikke findes! </h1>
        <p>
        Det er vi kede af! Vi har sendt en besked af sted til vores internetbureau, og bedt dem se på fejlen.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn-primary">Til forsiden</Link>
  
        </div>
      </div>
    </div>
  )
}

export default NotFound
