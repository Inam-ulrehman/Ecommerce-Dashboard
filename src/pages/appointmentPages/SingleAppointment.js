import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import AppointmentDate from '../../components/appointment/AppointmentDate'
import AvailableSlots from '../../components/appointment/AvailableSlots'
import Category from '../../components/appointment/Category'
import CustomerDetails from '../../components/appointment/CustomerDetails'
import {
  clearState,
  getStateValues,
  singleAppointmentThunk,
  updateAppointmentThunk,
} from '../../features/appointment/appointmentSlice'

const SingleAppointment = () => {
  const dispatch = useDispatch()
  const { _id } = useParams()

  useEffect(() => {
    dispatch(getStateValues({ name: 'updateId', value: _id }))
    dispatch(clearState())
    dispatch(singleAppointmentThunk(_id))
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <Category />
      <AppointmentDate />
      <AvailableSlots />
      <CustomerDetails action={updateAppointmentThunk} />
    </div>
  )
}

export default SingleAppointment
