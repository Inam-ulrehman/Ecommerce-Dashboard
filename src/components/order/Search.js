import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  clearState,
  getOrdersThunk,
  getStateValues,
} from '../../features/order/orderSlice'

const Search = () => {
  const dispatch = useDispatch()
  const { order } = useSelector((state) => state)
  const {
    sort,
    limit,
    page,
    refreshData,
    searchEmail,
    searchPhone,
    searchOrderId,
    searchStripeId,
  } = order
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }

  const handleClear = () => {
    dispatch(clearState())
  }

  useEffect(() => {
    dispatch(getOrdersThunk(order))
    // eslint-disable-next-line
  }, [
    sort,
    limit,
    page,
    refreshData,
    searchEmail,
    searchPhone,
    searchOrderId,
    searchStripeId,
  ])
  return (
    <Wrapper className='container'>
      <button className='btn clear-filter' type='button' onClick={handleClear}>
        Clear Filter
      </button>
      <div>
        <div className='limit-sort'>
          <div className='limit'>
            <label htmlFor='limit'>Limit</label>
            <select name='limit' id='limit' onChange={handleChange}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
            </select>
          </div>
          <div className='sort'>
            <label htmlFor='sort'>Sort</label>
            <select name='sort' id='sort' value={sort} onChange={handleChange}>
              <option value='-createdAt'>SELECT OPTIONS</option>
              <option value='-createdAt'>DATE NEW</option>
              <option value='createdAt'>DATE OLD</option>
            </select>
          </div>
          <div className='feature'></div>
        </div>
        {/* ============box divided */}
        <div className='search'>
          {/* phone */}

          <input
            type='number'
            placeholder='Phone'
            name='searchPhone'
            value={searchPhone}
            onChange={handleChange}
          />
          {/* email */}
          <input
            type='email'
            name='searchEmail'
            placeholder='Email'
            value={searchEmail}
            onChange={handleChange}
          />
          {/* Order Id */}
          <input
            type='text'
            name='searchOrderId'
            placeholder='Order Id'
            value={searchOrderId}
            onChange={handleChange}
          />
          {/* Stripe Id */}
          <input
            type='text'
            name='searchStripeId'
            placeholder='Stripe Id'
            value={searchStripeId}
            onChange={handleChange}
          />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  .clear-filter {
    position: absolute;
    top: 0;
    right: 5%;
  }
  .limit-sort {
    display: flex;
    margin-bottom: 5px;
    gap: 1rem;
  }
  .sort,
  .limit {
    select {
      :hover {
        cursor: pointer;
      }
    }
  }
`
export default Search
