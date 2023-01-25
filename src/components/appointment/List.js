import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/helper'
import styled from 'styled-components'
import {
  deleteAppointmentThunk,
  getStateValues,
} from '../../features/appointment/appointmentSlice'
import Warning from '../Warning'

import { showWarning } from '../../features/functions/functionSlice'

const List = () => {
  const dispatch = useDispatch()
  const { appointment, function: warningHolder } = useSelector((state) => state)

  const handleDelete = (_id) => {
    const name = 'deleteId'
    const value = _id
    dispatch(getStateValues({ name, value }))
    dispatch(showWarning())
  }

  if (appointment.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      {/* Show warning  */}
      {warningHolder.warning && (
        <Warning
          action={() => dispatch(deleteAppointmentThunk(appointment.deleteId))}
        />
      )}
      {/* show table */}
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>StartTime</th>
            <th>EndTime</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
          {appointment.list?.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.slot?.startTime}</td>
                <td>{item.slot?.endTime}</td>
                <td>{item.confirmed ? 'confirmed' : 'pending'}</td>
                <td>{formatDate(item.date.split('T')[0])}</td>
                <td>
                  <Link className='btn' to={`${item._id}`}>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className='btn'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default List
