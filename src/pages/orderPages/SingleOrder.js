import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { customFetch } from '../../utils/axios'
import { formatDate, formatPrice } from '../../utils/helper'
import { getUserFromLocalStorage } from '../../utils/localStorage'
const initialState = {
  cart: [],
  createdAt: '',
  createdBy: '',
  payment_intent: '',
  redirect_status: '',
  shipment: '',
  total: '',
  updatedAt: '',
  isLoading: false,
}

const SingleOrder = () => {
  const [state, setState] = useState(initialState)
  const { _id } = useParams()

  const fetchData = async (e) => {
    const { token } = getUserFromLocalStorage()
    setState({ ...state, isLoading: true })
    try {
      const result = await customFetch.get(`/admin/orders/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setState({ ...state, isLoading: false, ...result.data[0] })
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])
  if (state.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      <div className='heading-container'>
        <div>
          <p>
            Order Date: <strong>{formatDate(state.createdAt)}</strong>
          </p>
        </div>
        <div>
          <p>
            Payment Status: <strong>{state.redirect_status}</strong>
          </p>
        </div>
        <div>
          <p>
            Shipment Status:
            <strong>{state.shipment ? 'Shipped' : 'Processing'}</strong>
          </p>
        </div>
        <div>
          <p>
            Total Bill:
            <strong>{formatPrice(state.total)}</strong>
          </p>
        </div>
      </div>
      {/* ===========order details========== */}

      <div className='cart-container'>
        {state.cart.map((item, index) => {
          console.log(item)
          return (
            <div key={index}>
              <div className='item-heading'>
                <span>
                  Title: <strong>{item.title}</strong>
                </span>
                <span>
                  Category: <strong>{item.category}</strong>
                </span>
                <span>
                  Sub Category: <strong>{item.subCategory}</strong>
                </span>
                <span>
                  Total Quantity: <strong>{item.quantity}</strong>
                </span>
                <span>
                  Product Total: <strong>{formatPrice(item.amount)}</strong>
                </span>
              </div>
              <div className='image-container'>
                <div className='img'>
                  {item.uploadImage.map((item) => (
                    <img src={item.secure_url} alt='products' />
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {/* ===========customer details============ */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .heading-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    div {
      padding: 1rem;
      box-shadow: var(--shadow-2);
      background-color: var(--white);
      p {
        margin: 0;
      }
      strong {
        margin-left: 1rem;
      }
    }
  }
  /* ======= cart=========== */
  .item-heading {
    margin-top: 1rem;
    background-color: var(--grey-2);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    span {
      padding: 0 1rem;
    }
  }
  .image-container {
    box-shadow: var(--shadow-2);
    .img {
      display: flex;
      gap: 1rem;
      width: 100px;
      height: 100px;
      img {
        max-width: 100%;
      }
    }
  }
`
export default SingleOrder
