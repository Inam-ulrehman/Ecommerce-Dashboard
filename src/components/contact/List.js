import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/helper'
import styled from 'styled-components'

import Warning from '../Warning'

import { showWarning } from '../../features/functions/functionSlice'
import {
  deleteSingleContactThunk,
  getStateValues,
} from '../../features/contact/contactSlice'

const List = () => {
  const dispatch = useDispatch()
  const { contact, function: warningHolder } = useSelector((state) => state)

  const handleDelete = (_id) => {
    const name = 'deleteId'
    const value = _id
    dispatch(getStateValues({ name, value }))
    dispatch(showWarning())
  }

  if (contact.isLoading) {
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
          action={() => dispatch(deleteSingleContactThunk(contact.deleteId))}
        />
      )}
      {/* show table */}
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
          {contact.list?.map((item, index) => {
            return (
              <tr className='tr' key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.subject}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td className='buttons'>
                  <Link className='btn' to={`${item._id}`}>
                    Read
                  </Link>
                  <button
                    className='btn'
                    onClick={() => handleDelete(item._id)}
                    type='button'
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

const Wrapper = styled.div`
  table {
    text-align: center;
  }
`

export default List
