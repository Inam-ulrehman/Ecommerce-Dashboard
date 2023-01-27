import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/helper'
import styled from 'styled-components'

import Warning from '../Warning'
import { showWarning } from '../../features/functions/functionSlice'
import {
  deleteSingleOrderThunk,
  getStateValues,
} from '../../features/order/orderSlice'

const List = () => {
  const dispatch = useDispatch()
  const { order, function: warningHolder } = useSelector((state) => state)

  const handleDelete = (_id) => {
    const name = 'deleteId'
    const value = _id
    dispatch(getStateValues({ name, value }))
    dispatch(showWarning())
  }

  return (
    <Wrapper>
      {/* Show warning  */}
      {warningHolder.warning && (
        <Warning
          action={() => dispatch(deleteSingleOrderThunk(order.deleteId))}
        />
      )}
      {/* show table */}
      <table>
        <tbody>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Stock</th>
            <th>payment</th>
            <th>Total</th>
            <th>status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
          {order.list?.map((item) => {
            console.log(item)
            return (
              <tr key={item._id}>
                <td>
                  {item.cart.map((item) => (
                    <div>
                      <img src={item.uploadImage[0].secure_url} alt='' />
                    </div>
                  ))}
                </td>
                <td>
                  {item.cart.map((item) => (
                    <div>{item.title}</div>
                  ))}
                </td>
                <td>
                  {item.cart.map((item) => (
                    <div>{item.quantity}</div>
                  ))}
                </td>
                <td>
                  {item.cart.map((item) => (
                    <div>{item.totalStock}</div>
                  ))}
                </td>
                <td>{item.redirect_status}</td>
                <td>{item.total}</td>
                <td>{item.shipment ? `completed` : `Processing`}</td>
                <td>{formatDate(item.date)}</td>
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

const Wrapper = styled.div`
  table {
    text-align: center;
    img {
      max-width: 70px;
    }
  }
`

export default List
