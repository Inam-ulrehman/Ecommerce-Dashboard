import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  appointmentThunk,
  clearState,
  getStateValues,
} from '../../features/appointment/appointmentSlice'

const Search = () => {
  const dispatch = useDispatch()
  const { appointment } = useSelector((state) => state)
  const {
    searchName,
    searchEmail,
    searchPhone,
    searchDate,
    sort,
    limit,
    page,
    refreshData,
  } = appointment

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  const handleClear = () => {
    dispatch(clearState())
  }

  useEffect(() => {
    dispatch(
      appointmentThunk({
        searchName,
        searchEmail,
        searchPhone,
        sort,
        searchDate,
        limit,
        page,
      })
    )

    // eslint-disable-next-line
  }, [
    searchName,
    searchEmail,
    searchPhone,
    sort,
    searchDate,
    refreshData,
    limit,
    page,
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
            <select
              name='sort'
              id='sort'
              value={appointment.sort}
              onChange={handleChange}
            >
              <option value='-createdAt'>SELECT OPTIONS</option>
              <option value='-createdAt'>DATE NEW</option>
              <option value='createdAt'>DATE OLD</option>
            </select>
          </div>
          <div className='feature'></div>
        </div>
        {/* ============box divided */}
        <div className='search'>
          <input
            type='text'
            name='searchName'
            placeholder='Name'
            value={searchName}
            onChange={handleChange}
          />
          <input
            type='email'
            name='searchEmail'
            placeholder='Email'
            value={searchEmail}
            onChange={handleChange}
          />

          {/* phone */}

          <input
            type='number'
            placeholder='Phone'
            name='searchPhone'
            value={searchPhone}
            onChange={handleChange}
          />
          {/* date */}
          <input
            type='date'
            name='searchDate'
            value={searchDate}
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

  button {
    border: transparent;

    box-shadow: var(--shadow-1);
    padding: 4px;
    transition: var(--transition);
    :hover {
      cursor: pointer;
      background-color: var(--primary-5);
      color: var(--white);
    }
  }
`
export default Search
