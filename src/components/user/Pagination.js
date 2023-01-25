import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { indexOrder, nextOrder, prevOrder } from '../../features/user/userSlice'

const Pagination = () => {
  const dispatch = useDispatch()
  const { page, nbHits, limit } = useSelector((state) => state.user)

  const totalPages = Math.ceil(nbHits / limit)
  const pages = Array.from({ length: totalPages }, (v, i) => i + 1)

  // handle buttons

  const handleNext = (e) => {
    if (pages.length <= page) {
      return
    }
    dispatch(nextOrder())
  }

  const handleIndex = (e) => {
    dispatch(indexOrder(e.target.value))
  }

  const handlePrev = (e) => {
    if (page <= 1) {
      return
    }
    dispatch(prevOrder())
  }
  console.log(page > 1)
  return (
    <Wrapper className='title'>
      <button className='btn' type='button' onClick={handlePrev}>
        Prev
      </button>
      {/* Page Pagination */}
      {page > 1 && (
        <>
          <button className='btn' onClick={handleIndex} value={1}>
            1
          </button>
          <span>....</span>
        </>
      )}

      {pages
        .map((item, index) => {
          return (
            <button
              key={index}
              className={Number(page) === index + 1 ? `btn active` : 'btn'}
              type='button'
              onClick={handleIndex}
              value={item}
            >
              {item}
            </button>
          )
        })
        .slice(page - 1, page + 4)}
      {page !== pages.length && (
        <>
          <span>....</span>
          <button className='btn' onClick={handleIndex} value={pages.length}>
            {pages.length}
          </button>
        </>
      )}
      <button className='btn' type='button' onClick={handleNext}>
        Next
      </button>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .active {
    background-color: var(--primary-8);
  }
`
export default Pagination
