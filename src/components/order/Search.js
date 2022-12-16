import React from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
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

  // handle Searches
  const handlePhone = (e) => {
    e.preventDefault()
    const phone = phoneRef.current.value
    dispatch(searchOrderByPhone(phone))
    phoneRef.current.value = ''
  }
  // handle Email
  const handleEmail = (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    dispatch(searchOrderByEmail(email))
    emailRef.current.value = ''
  }
  // handle OrderId
  const handleOrderId = (e) => {
    e.preventDefault()
    const orderId = orderIdRef.current.value
    dispatch(searchOrderById(orderId))
    orderIdRef.current.value = ''
  }
  return (
    <Wrapper>
      <div className='total'>
        <h3>Total:{totalOrders}</h3>
        <h3>Page:{page} </h3>
      </div>
      {/* phone search */}
      <form onClick={handlePhone}>
        <label htmlFor='phone'>Phone No</label>
        <input type='text' ref={phoneRef} />
        <button type='submit'>Search</button>
      </form>
      {/* email Search */}
      <form onClick={handleEmail}>
        <label htmlFor='phone'>Email</label>
        <input type='text' ref={emailRef} />
        <button type='submit'>Search</button>
      </form>
      {/* Order _id */}
      <form onClick={handleOrderId}>
        <label htmlFor='order'>Order Id</label>
        <input type='text' ref={orderIdRef} />
        <button type='submit'>Search</button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .total {
    display: flex;
    justify-content: space-between;
  }
`
export default Search
