import React from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  clearOrderSearch,
  searchOrderByEmail,
  searchOrderById,
  searchOrderByPhone,
} from '../../features/order/orderSlice'

const Search = () => {
  const dispatch = useDispatch()
  const { totalOrders, page } = useSelector((state) => state.order)
  const phoneRef = useRef()
  const emailRef = useRef()
  const orderIdRef = useRef()
  const sortRef = useRef()

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
  // handle OrderId
  const handleClear = () => {
    orderIdRef.current.value = ''
    phoneRef.current.value = ''
    emailRef.current.value = ''
    dispatch(clearOrderSearch())
  }
  // handle OrderId
  const handleSort = (e) => {
    console.log(sortRef.current.value)
  }
  return (
    <Wrapper>
      <div className='total'>
        <strong>Total:{totalOrders}</strong>
        <strong>Page No:{page} </strong>
      </div>
      <div className='form-container'>
        {/* phone search */}
        <form onClick={handlePhone}>
          <label htmlFor='phone'>
            <strong>Phone No</strong>
          </label>
          <input type='number' ref={phoneRef} />
          <button className='btn' type='submit'>
            <strong>Search</strong>
          </button>
        </form>
        {/* email Search */}
        <form onClick={handleEmail}>
          <label htmlFor='phone'>
            <strong>Email</strong>
          </label>
          <input type='text' ref={emailRef} />
          <button className='btn' type='submit'>
            Search
          </button>
        </form>
        {/* Order _id */}
        <form onClick={handleOrderId}>
          <label htmlFor='order'>
            <strong>Order Id</strong>
          </label>
          <input type='text' ref={orderIdRef} />
          <button className='btn' type='submit'>
            Search
          </button>
        </form>
        {/* clear filter button */}
        <div className='clear-sort'>
          <button className='btn' type='button' onClick={handleClear}>
            Clear Filters
          </button>
          {/* handle sort */}
          <div>
            <label htmlFor='sort'>Sort By</label>
            <select onChange={handleSort} ref={sortRef} name='sort' id='sort'>
              <option value='-createdAt'>Default</option>
              <option value='-createdAt'>New Orders</option>
              <option value='createdAt'>Old Orders</option>
            </select>
          </div>
        </div>
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
    label {
      margin: 0 5px;
    }
    input {
      padding: 0.375rem 0rem;
      border-radius: var(--borderRadius);
      background: var(--backgroundColor);
      border: 2px solid var(--grey-2);
    }
  }
`
export default Search
