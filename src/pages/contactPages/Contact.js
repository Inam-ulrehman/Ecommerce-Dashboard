import moment from 'moment/moment'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Pagination } from '../../components'
import {
  getContactDeleteId,
  getContactThunk,
} from '../../features/contact/contactSlice'
import { showContactWarning } from '../../features/functions/functionSlice'

const Contact = () => {
  const dispatch = useDispatch()
  const { contactList, count, isLoading, getContacts } = useSelector(
    (state) => state.contact
  )

  const [index, setIndex] = useState(0)
  //=== handle Delete button

  const handleDelete = (_id) => {
    console.log(_id)
    dispatch(showContactWarning())
    dispatch(getContactDeleteId(_id))
  }

  useEffect(() => {
    dispatch(getContactThunk())
    // eslint-disable-next-line
  }, [getContacts])
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
        Total forms: {count} <strong>Page No: {index + 1}</strong>
      </h4>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>

          {contactList[index]?.map((item, itemIndex) => {
            return (
              <tr key={itemIndex}>
                <td>{item.name}</td>
                <td>{item.subject}</td>
                <td>{moment(item.createdAt).format('MMM Do YY')}</td>
                <td>
                  <Link to={`${item._id}`}>Read</Link>{' '}
                  <button onClick={() => handleDelete(item._id)} type='button'>
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination
        index={index}
        setIndex={setIndex}
        productsList={contactList}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  h4 {
    strong {
      float: right;
    }
  }
`
export default Contact
