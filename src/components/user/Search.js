import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  clearState,
  getStateValues,
  getUsersThunk,
} from '../../features/user/userSlice'

const Search = () => {
  const dispatch = useDispatch()
  const {
    searchName,
    searchPhone,
    searchEmail,
    searchAddress,
    searchPostalCode,
    searchId,
    sort,
    page,
    limit,
  } = useSelector((state) => state.user)

  const handleClear = () => {
    dispatch(clearState())
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }

  useEffect(() => {
    dispatch(
      getUsersThunk({
        searchName,
        searchPhone,
        searchEmail,
        searchAddress,
        searchPostalCode,
        searchId,
        sort,
        page,
        limit,
      })
    )
    // eslint-disable-next-line
  }, [
    searchName,
    searchPhone,
    searchEmail,
    searchAddress,
    searchPostalCode,
    searchId,
    sort,
    page,
    limit,
  ])
  return (
    <Wrapper className='container'>
      <button className='btn clear-filter' type='button' onClick={handleClear}>
        Clear Filter
      </button>

      <div className='limit-sort'>
        <div className='limit'>
          <label htmlFor='limit'>Limit</label>
          <select name='limit' id='limit' value={limit} onChange={handleChange}>
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
        {/* name */}
        <input
          type='text'
          name='searchName'
          placeholder='Name'
          value={searchName}
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
        {/* address */}
        <input
          type='text'
          name='searchAddress'
          placeholder='Address'
          value={searchAddress}
          onChange={handleChange}
        />
        {/* PostalCode */}
        <input
          type='text'
          name='searchPostalCode'
          placeholder='Postal Code'
          value={searchPostalCode}
          onChange={handleChange}
        />
        {/* phone */}
        <input
          type='number'
          name='searchPhone'
          placeholder='Phone'
          value={searchPhone}
          onChange={handleChange}
        />
        {/* user Id */}
        <input
          type='text'
          name='searchId'
          placeholder='User Id'
          value={searchId}
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
