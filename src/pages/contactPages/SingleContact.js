import moment from 'moment/moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getSingleContactThunk } from '../../features/contact/contactSlice'

const SingleContact = () => {
  const dispatch = useDispatch()
  const { _id } = useParams()
  const { singleContact, isLoading } = useSelector((state) => state.contact)

  useEffect(() => {
    dispatch(getSingleContactThunk(_id))
    // eslint-disable-next-line
  }, [])
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
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
            <th>Subject</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created At</th>
          </tr>

          <tr>
            <th>{singleContact.name}</th>
            <th>{singleContact.subject}</th>
            <th>{singleContact.email}</th>
            <th>{singleContact.phone}</th>
            <th>{moment(singleContact.createdAt).format('MMM Do YY')}</th>
          </tr>
        </tbody>
      </table>
      <div className='message'>
        <h3 className='title'>Message</h3>
        <p>{singleContact.message}</p>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  table {
  }
  .message {
    background-color: var(--white);
    max-width: 70vw;
    box-shadow: var(--shadow-2);
    margin: 1rem auto;
    padding: 1rem;
    overflow: scroll;
    p {
      word-break: break-all;
    }
  }
`
export default SingleContact
