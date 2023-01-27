import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  getContactThunk,
  getStateValues,
} from '../../features/contact/contactSlice'

const Search = () => {
  const dispatch = useDispatch()
  const {
    searchName,
    searchEmail,
    searchPhone,
    sort,
    limit,
    page,
    refreshData,
    count,
    list,
  } = useSelector((state) => state.contact)

  const handleClear = () => {
    window.location.reload()
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  useEffect(() => {
    dispatch(
      getContactThunk({
        searchName,
        searchEmail,
        searchPhone,
        sort,
        limit,
        page,
        count,
        list,
      })
    )
    // eslint-disable-next-line
  }, [searchName, searchEmail, searchPhone, sort, limit, page, refreshData])

  return (
    <Wrapper className='container'>
      <button className='btn clear-filter' type='button' onClick={handleClear}>
        Clear Filter
      </button>

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
            <option value='title'>NAME A-Z</option>
            <option value='-title'>NAME Z-A</option>
          </select>
        </div>
      </div>
      {/* ============box divided */}
      <div className='search'>
        <input
          type='text'
          placeholder='First Name'
          name='searchName'
          value={searchName}
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          name='searchEmail'
          value={searchEmail}
          onChange={handleChange}
        />
        <input
          type='number'
          placeholder='Phone Number'
          name='searchPhone'
          value={searchPhone}
          onChange={handleChange}
        />
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
