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
  const { page, count, list } = useSelector((state) => state.contact)

  //=== handle Delete button

  const handleDelete = (_id) => {
    dispatch(showContactWarning())
    dispatch(getContactDeleteId(_id))
  }

  return (
    <Wrapper>
      <div className='container-heading'>
        <span></span>
        <span>
          Total Results:
          <strong> {count}</strong>
        </span>
        <span>
          Page No:<strong>{page}</strong>
        </span>
      </div>
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

          {list?.map((item, itemIndex) => {
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
  .container-heading {
    display: flex;
    justify-content: space-between;
    span {
      padding: 0 2rem;
    }
  }
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
