import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SelectedAppointment } from '../../components/appointment'
import AppointmentDate from '../../components/appointment/AppointmentDate'
import AvailableSlots from '../../components/appointment/AvailableSlots'
import Category from '../../components/appointment/Category'
import CustomerDetails from '../../components/appointment/CustomerDetails'
import { clearState } from '../../features/appointment/appointmentSlice'
import { createAppointmentThunk } from '../../features/appointment/appointmentSlice'

const RegisterAppointment = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearState())
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <Category />
      <AppointmentDate />
      <SelectedAppointment />
      <AvailableSlots />
      <CustomerDetails action={createAppointmentThunk} />
    </div>
  )
}

export default RegisterAppointment
