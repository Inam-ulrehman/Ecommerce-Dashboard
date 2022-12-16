import moment from 'moment/moment'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getOrdersThunk } from '../../features/order/orderSlice'
import { formatPrice } from '../../utils/helper'

const Orders = () => {
  const dispatch = useDispatch()
  const { orderList, isLoading } = useSelector((state) => state.order)

  useEffect(() => {
    dispatch(getOrdersThunk())
    // eslint-disable-next-line
  }, [])
  if (isLoading)
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  return (
    <Wrapper>
      <div className='container'>
        <table>
          <tbody>
            <tr>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>QUANTITY</th>
              <th>PAYMENT</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>ACTION</th>
            </tr>
            {orderList?.map((item) => {
              const { cart } = item
              // grab names
              const name = cart.map((item, index) => (
                <div key={index}>{item.title}</div>
              ))
              // grab image
              const image = cart.map((item) => item.uploadImage[0].secure_url)

              // grab quantity
              const quantity = cart.map((item, index) => (
                <div key={index}>{item.quantity}</div>
              ))
              return (
                <tr key={item._id}>
                  <td className='image'>
                    {image.map((item) => (
                      <img src={item} alt='' />
                    ))}
                    {/* <img src='' alt={item.title} /> */}
                  </td>
                  <td className='name'>{name}</td>
                  <td className='quantity'>{quantity}</td>
                  <td>{item.redirect_status}</td>
                  <td className='date'>
                    {moment(item.createdAt).format('MMM Do YYYY')}
                  </td>
                  <td>{formatPrice(item.total)}</td>
                  <td className='buttons'>
                    <Link to={item._id} type='button' className='btn'>
                      Select
                    </Link>
                    <button type='button' className='btn'>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .buttons {
    width: 180px;
    a {
      padding: 1px 10px;
    }
    a,
    button {
      margin: 5px;
    }
  }
  .date {
    width: 130px;
  }
  .image {
    width: 70px;
    img {
      width: 100%;
    }
  }
  td {
    text-align: center;
  }
  .name {
    div {
      padding: 1rem;
    }
  }
  .quantity {
    div {
      padding: 1rem;
    }
  }
`
export default Orders
