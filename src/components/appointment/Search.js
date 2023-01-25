import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  appointmentThunk,
  getStateValues,
} from '../../features/appointment/appointmentSlice'

const Search = () => {
  const dispatch = useDispatch()
  const { appointment } = useSelector((state) => state)
  const {
    searchName,
    searchEmail,
    searchPhone,
    sort,
    searchDate,
    refreshData,
  } = appointment

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  const handleClear = () => {
    window.location.reload()
  }

  useEffect(() => {
    dispatch(
      appointmentThunk({
        searchName,
        searchEmail,
        searchPhone,
        sort,
        searchDate,
      })
    )

    // eslint-disable-next-line
  }, [searchName, searchEmail, searchPhone, sort, searchDate, refreshData])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
    // eslint-disable-next-line
  }, [appointment.page])
  return (
    <Wrapper className='container'>
      <button className='btn clear-filter' type='button' onClick={handleClear}>
        Clear Filter
      </button>
      <form onSubmit={handleSubmit}>
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
          <div className='feature'>
            <button
              type='button'
              className={appointment.searchConfirm ? 'btn' : ''}
            >
              Feature
            </button>
          </div>
        </div>
        {/* ============box divided */}
        <div className='search'>
          <input
            type='text'
            name='searchName'
            placeholder='Name'
            value={appointment.searchName}
            onChange={handleChange}
          />
          <input
            type='email'
            name='searchEmail'
            placeholder='Email'
            value={appointment.searchEmail}
            onChange={handleChange}
          />

          {/* phone */}

          <input
            type='number'
            placeholder='Phone'
            name='searchPhone'
            value={appointment.searchPhone}
            onChange={handleChange}
          />
          {/* date */}
          <input
            type='date'
            name='searchDate'
            value={appointment.searchDate}
            onChange={handleChange}
          />
        </div>
      </form>
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
