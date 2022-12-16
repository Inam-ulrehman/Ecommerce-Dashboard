import React from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { searchOrderByPhone } from '../../features/order/orderSlice'

const Search = () => {
  const dispatch = useDispatch()
  const { totalOrders, page } = useSelector((state) => state.order)
  const phoneRef = useRef()

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const phone = phoneRef.current.value
    dispatch(searchOrderByPhone(phone))
  }
  return (
    <Wrapper>
      <div className='total'>
        <h3>Total:{totalOrders}</h3>
        <h3>Page:{page} </h3>
      </div>
      <form onClick={handleSubmit}>
        <label htmlFor='phone'>Phone No</label>
        <input type='text' ref={phoneRef} />
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
