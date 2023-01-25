import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Pagination from '../../components/contact/Pagination'
import Search from '../../components/contact/Search'

import { getContactDeleteId } from '../../features/contact/contactSlice'
import { showContactWarning } from '../../features/functions/functionSlice'
import { formatDate } from '../../utils/helper'

const Contact = () => {
  const dispatch = useDispatch()
  const { contactList, count, page, isLoading } = useSelector(
    (state) => state.contact
  )

  //=== handle Delete button

  const handleDelete = (_id) => {
    dispatch(showContactWarning())
    dispatch(getContactDeleteId(_id))
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
        <div className='div'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      <h4>
        <strong>Total forms: {count}</strong>
        <strong>Page No: {page}</strong>
      </h4>
      <Search />
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>

          {contactList?.map((item, itemIndex) => {
            return (
              <tr className='tr' key={itemIndex}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
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
      <Pagination />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  h4 {
    display: flex;
    justify-content: space-between;
  }
  .buttons {
    width: 160px;
    a {
      margin: 5px;
      padding: 1px 9px;
    }
  }

  .tr {
    text-align: center;
    td {
      text-transform: capitalize;
    }
  }
`
export default Contact
