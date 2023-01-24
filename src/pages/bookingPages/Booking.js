import React from 'react'
import { Link } from 'react-router-dom'

const Booking = () => {
  return (
    <div>
      <div className='button-holder'>
        <Link to={`register`} className='btn'>
          Register Booking
        </Link>
      </div>
    </div>
  )
}

export default Booking
