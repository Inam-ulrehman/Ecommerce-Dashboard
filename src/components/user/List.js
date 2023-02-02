import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/helper'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBack2Line } from 'react-icons/ri'
import ListWrapper from '../../Wrapper/dashboard/ListWrapper'
import { deleteUserThunk, getStateValues } from '../../features/user/userSlice'
import Warning from '../Warning'
import { showWarning } from '../../features/functions/functionSlice'

const List = () => {
  const dispatch = useDispatch()
  const { user, function: warningHolder } = useSelector((state) => state)

  const handleDelete = (_id) => {
    const name = 'deleteId'
    const value = _id
    dispatch(getStateValues({ name, value }))
    dispatch(showWarning())
  }

  if (user.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <ListWrapper>
      {/* Show warning  */}
      {warningHolder.warning && (
        <Warning action={() => dispatch(deleteUserThunk(user.deleteId))} />
      )}
      {/* show table */}
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
          {user.list?.map((item) => {
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
                    <FiEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className='btn'
                  >
                    <RiDeleteBack2Line />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </ListWrapper>
  )
}

export default List
