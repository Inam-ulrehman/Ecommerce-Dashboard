import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/helper'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBack2Line } from 'react-icons/ri'
import Warning from '../Warning'
import { showWarning } from '../../features/functions/functionSlice'
import {
  deleteManyContactThunk,
  deleteSingleContactThunk,
  getStateValues,
} from '../../features/contact/contactSlice'
import ListWrapper from '../../Wrapper/dashboard/ListWrapper'
import { useState } from 'react'
const initialState = {
  deleteMany: [],
}
const List = () => {
  const [state, setState] = useState(initialState)
  const dispatch = useDispatch()
  const { contact, function: warningHolder } = useSelector((state) => state)

  const handleDelete = (_id) => {
    const name = 'deleteId'
    const value = _id
    dispatch(getStateValues({ name, value }))
    dispatch(showWarning())
  }

  // =======deleteMany  Handle Inside the State=======
  const handleSelectAll = () => {
    if (contact.list.length === state.deleteMany.length) {
      return setState({ ...state, deleteMany: [] })
    }
    setState({
      ...state,

      deleteMany: contact.list,
    })
  }
  const handleSelectOne = (_id) => {
    if (state.deleteMany.find((item) => item._id === _id)) {
      return setState({
        ...state,
        deleteMany: state.deleteMany.filter((item) => item._id !== _id),
      })
    }
    const result = contact.list.find((item) => item._id === _id)
    const newValue = [...state.deleteMany, result]
    setState({ ...state, deleteMany: newValue })
  }

  const handleDeleteMany = () => {
    dispatch(deleteManyContactThunk(state.deleteMany))
    setState({ ...state, deleteMany: [] })
  }
  // =======deleteMany =======
  if (contact.isLoading) {
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
        <Warning
          action={() => dispatch(deleteSingleContactThunk(contact.deleteId))}
        />
      )}

      {/* show delete all button */}
      {state.deleteMany.length > 0 ? (
        <div className='Delete-objects'>
          <button className='btn' onClick={handleDeleteMany}>
            Delete Selected
          </button>
        </div>
      ) : (
        <div></div>
      )}
      {/* show table */}
      <table>
        <tbody>
          <tr>
            <th>
              <input
                type='checkbox'
                checked={state.deleteMany.length === contact.list.length}
                value={state.selectAll}
                onChange={handleSelectAll}
              />
            </th>
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
                <td>
                  <input
                    type='checkbox'
                    value={state.selectOne}
                    checked={
                      state.deleteMany.find((items) => items._id === item._id)
                        ? true
                        : false
                    }
                    onChange={() => handleSelectOne(item._id)}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.subject}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td className='buttons'>
                  <Link className='btn' to={`${item._id}`}>
                    <FiEdit />
                  </Link>
                  <button
                    className='btn'
                    onClick={() => handleDelete(item._id)}
                    type='button'
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
