import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { List, Pagination, Search } from '../../components/appointment'
import { appointmentThunk } from '../../features/appointment/appointmentSlice'

const Appointment = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(appointmentThunk())
    // eslint-disable-next-line
  }, [])
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
