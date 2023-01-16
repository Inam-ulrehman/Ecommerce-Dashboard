import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { queryProducts } from '../../features/products/productSlice'
import { customFetch } from '../../utils/axios'

const Search = () => {
  const [feature, setFeature] = useState()
  const dispatch = useDispatch()
  const titleRef = useRef()
  const categoryRef = useRef()
  const subCategoryRef = useRef()
  const _idRef = useRef()

  const limitRef = useRef()
  const sortRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const title = titleRef.current.value
    const category = categoryRef.current.value
    const subCategory = subCategoryRef.current.value
    const _id = _idRef.current.value

    const limit = limitRef.current.value
    const sort = sortRef.current.value

    try {
      const response = await customFetch.get(
        `/products?title=${title}&category=${category}&subCategory=${subCategory}&_id=${_id}&feature=${feature}&limit=${limit}&sort=${sort}`
      )

      dispatch(queryProducts(response.data))
    } catch (error) {
      console.log(error.response)
    }
  }
  const handleClear = () => {
    window.location.reload()
  }
  return (
    <Wrapper className='container'>
      <button className='btn clear-filter' type='button' onClick={handleClear}>
        Clear Filter
      </button>
      <form onSubmit={handleSubmit}>
        <div className='limit-sort'>
          <div className='limit'>
            <label htmlFor='limit'>Limit</label>
            <select name='limit' id='limit' ref={limitRef}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
            </select>
          </div>
          <div className='sort'>
            <label htmlFor='sort'>Sort</label>
            <select name='sort' id='sort' ref={sortRef}>
              <option value='createdAt'>DATE NEW</option>
              <option value='-createdAt'>DATE OLD</option>
              <option value='-amount'>PRICE HIGH</option>
              <option value='amount'>PRICE LOW</option>
              <option value='title'>NAME A-Z</option>
              <option value='-title'>NAME Z-A</option>
            </select>
          </div>
          <div className='feature'>
            <button
              type='button'
              className={feature ? 'btn' : ''}
              onClick={() => setFeature(true)}
            >
              Feature
            </button>
          </div>
        </div>
        {/* ============box divided */}
        <div className='search'>
          <input type='text' ref={titleRef} placeholder='Title' />
          <input type='text' ref={categoryRef} placeholder='Category' />
          <input type='text' ref={subCategoryRef} placeholder='SubCategory' />
          <input type='text' ref={_idRef} placeholder='id' />
          <button className='btn' type='submit'>
            Search
          </button>
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
  }
`
export default Search
