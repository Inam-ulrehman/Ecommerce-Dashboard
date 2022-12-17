import React from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import {
  clearOrderSearch,
  limitOrder,
  searchOrderByEmail,
  searchOrderById,
  searchOrderByPaymentIntent,
  searchOrderByPhone,
  sortOrder,
} from '../../features/order/orderSlice'

const Search = () => {
  const dispatch = useDispatch()
  const { totalOrders, page } = useSelector((state) => state.order)
  const phoneRef = useRef()
  const emailRef = useRef()
  const paymentIntentRef = useRef()
  const orderIdRef = useRef()
  const sortRef = useRef()
  const limitRef = useRef()

  // handle Searches
  const handlePhone = (e) => {
    e.preventDefault()
    const phone = phoneRef.current.value
    dispatch(searchOrderByPhone(phone))
  }
  // handle Email
  const handleEmail = (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    dispatch(searchOrderByEmail(email))
  }
  // handle OrderId
  const handleOrderId = (e) => {
    e.preventDefault()
    const orderId = orderIdRef.current.value
    dispatch(searchOrderById(orderId))
  }
  // handle PaymentIntent
  const handlePaymentIntent = (e) => {
    e.preventDefault()
    const paymentIntent = paymentIntentRef.current.value
    dispatch(searchOrderByPaymentIntent(paymentIntent))
  }
  // handle OrderId
  const handleClear = () => {
    orderIdRef.current.value = ''
    phoneRef.current.value = ''
    emailRef.current.value = ''
    paymentIntentRef.current.value = ''
    sortRef.current.value = ''
    limitRef.current.value = ''
    dispatch(clearOrderSearch())
  }
  // handle Sort
  const handleSort = (e) => {
    const sort = sortRef.current.value
    dispatch(sortOrder(sort))
  }
  // handle Limit
  const handleLimit = (e) => {
    const limit = limitRef.current.value
    dispatch(limitOrder(limit))
  }
  return (
    <Wrapper>
      <div className='total'>
        <strong>Total:{totalOrders}</strong>
        <strong>Page No:{page} </strong>
      </div>
      <div className='form-container'>
        {/* phone search */}
        <form onClick={handlePhone} className='mobile'>
          <input placeholder='Phone No' type='number' ref={phoneRef} />
          <button className='btn' type='submit'>
            <FaSearch />
          </button>
        </form>
        {/* email Search */}
        <form onClick={handleEmail}>
          <input placeholder='Email' type='text' ref={emailRef} />
          <button className='btn' type='submit'>
            <FaSearch />
          </button>
        </form>
        {/* Order _id */}
        <form onClick={handleOrderId}>
          <input placeholder='Order Id' type='text' ref={orderIdRef} />
          <button className='btn' type='submit'>
            <FaSearch />
          </button>
        </form>
        {/* payment_Intent */}
        <form onClick={handlePaymentIntent}>
          <input placeholder='Stripe Id' type='text' ref={paymentIntentRef} />
          <button className='btn' type='submit'>
            <FaSearch />
          </button>
        </form>
      </div>
      {/* clear filter and Sort*/}
      <div className='clear-sort'>
        {/* handle sort and limit */}
        <div className='sort-limit'>
          <label htmlFor='sort'>
            <strong>Sort By</strong>
          </label>
          <select onChange={handleSort} ref={sortRef} name='sort' id='sort'>
            <option value='-createdAt'>New Orders</option>
            <option value='createdAt'>Old Orders</option>
          </select>
          <label htmlFor='limit'>
            <strong>Limit Per Page</strong>
          </label>
          <select onChange={handleLimit} ref={limitRef} name='limit' id='limit'>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='30'>30</option>
            <option value='40'>40</option>
          </select>
        </div>
        <button className='btn' type='button' onClick={handleClear}>
          Clear Filters
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .total {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
  }
  .form-container {
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem 1rem;
    form {
      margin: 5px 5px;
      button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    input {
      padding: 0.3rem 0rem;
      border-radius: var(--borderRadius);
      background: var(--backgroundColor);
      border: 2px solid var(--grey-2);
    }
  }

  .clear-sort {
    display: flex;
    justify-content: space-between;
  }

  .mobile {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type='number'] {
      -moz-appearance: textfield;
    }
  }
  .sort-limit {
    label {
      margin: 0 1rem;
    }
    select {
      padding: 0.175rem 0rem;
      border-radius: var(--borderRadius);
      background: var(--backgroundColor);
      border: 2px solid var(--grey-2);
    }
  }
`
export default Search
