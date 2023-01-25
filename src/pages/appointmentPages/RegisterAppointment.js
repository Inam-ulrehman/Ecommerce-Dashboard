import React from 'react'
import AppointmentDate from '../../components/appointment/AppointmentDate'
import AvailableSlots from '../../components/appointment/AvailableSlots'
import Category from '../../components/appointment/Category'
import CustomerDetails from '../../components/appointment/CustomerDetails'

const RegisterAppointment = () => {
  return (
    <div>
      <Category />
      <AppointmentDate />
      <AvailableSlots />
      <CustomerDetails />
    </div>
  )
}

export default RegisterAppointment
