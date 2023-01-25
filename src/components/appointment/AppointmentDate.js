import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStateValues } from '../../features/appointment/appointmentSlice'

const AppointmentDate = () => {
  const dispatch = useDispatch()
  const { appointment } = useSelector((state) => state)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  return (
    <div>
      <div>
        <strong>Please pick a date</strong>
      </div>
      <input
        type='date'
        name='date'
        id='date'
        min={new Date().toLocaleDateString('en-ca')}
        value={appointment.date}
        onChange={handleChange}
      />
    </div>
  )
}

export default AppointmentDate
