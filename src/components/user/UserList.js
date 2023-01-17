import React from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { formatDate } from '../../utils/helper'

const UserList = () => {
  const { user } = useSelector((state) => state)

  if (user.isLoading) {
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
            <th>First Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Member Since</th>
            <th>Action</th>
          </tr>

          {user.userList.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.postalCode}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>
                  <Link className='btn' to={item._id}>
                    More Details
                  </Link>
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
  tr {
    text-align: center;
  }
`
export default UserList
