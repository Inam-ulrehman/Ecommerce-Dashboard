import React from 'react'
import { Link } from 'react-router-dom'
import { List, Pagination, Search } from '../../components/appointment'

const Appointment = () => {
  return (
    <div>
      <div className='btn-holder'>
        <Link to={`register`} className='btn'>
          Register Appointment
        </Link>
      </div>
      <Search />
      <List />
      <Pagination />
    </div>
  )
}

export default Appointment
