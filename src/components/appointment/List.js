import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/helper'
import styled from 'styled-components'
import { deleteAppointmentThunk } from '../../features/appointment/appointmentSlice'
const List = () => {
  const dispatch = useDispatch()
  const { appointment } = useSelector((state) => state)

  const handleDelete = (_id) => {
    // dispatch(deleteAppointmentThunk(_id))
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
                <td>{item.slot.startTime}</td>
                <td>{item.slot.endTime}</td>
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
