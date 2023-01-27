import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { BiSearchAlt2 } from 'react-icons/bi'
import {
  clearState,
  getProductsThunk,
  getStateValues,
} from '../../features/products/productSlice'

const Search = () => {
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state)
  const {
    searchTitle,
    searchCategory,
    searchSubCategory,
    searchProductId,
    searchFeature,
    sort,
    limit,
    page,
    refreshData,
  } = product

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  const handleClear = () => {
    dispatch(clearState())
  }

  const handleFeature = () => {
    const name = 'searchFeature'
    if (searchFeature) {
      dispatch(getStateValues({ name, value: '' }))
    } else {
      dispatch(getStateValues({ name, value: true }))
    }
  }

  useEffect(() => {
    dispatch(
      getProductsThunk({
        searchTitle,
        searchCategory,
        searchSubCategory,
        searchProductId,
        searchFeature,
        sort,
        limit,
        page,
        refreshData,
      })
    )

    // eslint-disable-next-line
  }, [
    searchTitle,
    searchCategory,
    searchSubCategory,
    searchProductId,
    searchFeature,
    sort,
    limit,
    page,
    refreshData,
  ])

  return (
    <Wrapper className='container'>
      <button className='btn clear-filter' type='button' onClick={handleClear}>
        Clear Filter
      </button>
      <div className='limit-sort-input'>
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
          <div className='feature'>
            <button
              className={searchFeature === '' ? 'btn' : 'btn active'}
              onClick={handleFeature}
            >
              Feature
            </button>
          </div>
        </div>
        {/* ============box divided */}
        <div className='search'>
          {/* title */}
          <div>
            <input
              type='text'
              name='searchTitle'
              placeholder='Title'
              value={searchTitle}
              onChange={handleChange}
            />
            <BiSearchAlt2 />
          </div>
          {/* category */}
          <div>
            <input
              type='text'
              name='searchCategory'
              placeholder='Category'
              value={searchCategory}
              onChange={handleChange}
            />
            <BiSearchAlt2 />
          </div>

          {/* SubCategory */}
          <div>
            <input
              type='text'
              placeholder='SubCategory'
              name='searchSubCategory'
              value={searchSubCategory}
              onChange={handleChange}
            />
            <BiSearchAlt2 />
          </div>

          {/* ProductId */}
          <div>
            <input
              type='text'
              placeholder='Product Id'
              name='searchProductId'
              value={searchProductId}
              onChange={handleChange}
            />
            <BiSearchAlt2 />
          </div>
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
    right: 0;
    border-radius: 0;
  }
  .limit-sort-input {
  }
  .limit-sort {
    display: flex;
    padding: 0 1rem;
    div {
      margin: 0 1rem;
    }
    label {
      padding: 5px;
    }
    select {
      border: transparent;
      background: var(--primary-5);
      color: var(--white);
      transition: var(--transition-1);
      padding: 3.5px;
      :hover {
        cursor: pointer;
        background-color: var(--primary-7);
      }
    }
    option {
      background-color: var(--white);
      color: var(--black);
    }
    .feature {
      Button {
        border-radius: 0;
      }
    }
    .active {
      background-color: var(--primary-7);
    }
  }
  /* Input css here */

  .search {
    padding: 5px;
    display: flex;
    div {
      display: flex;
      border: 2px solid var(--grey-2);
      margin-right: 2rem;
      justify-content: center;

      svg {
        margin-top: 3px;
        font-size: 1.2rem;
        margin-right: 5px;
      }
      input {
        padding: 3px;
        background: transparent;
        border: transparent;
        :hover {
          cursor: pointer;
        }
      }
    }
  }
`
export default Search
