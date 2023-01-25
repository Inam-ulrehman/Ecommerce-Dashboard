import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { index, next, prev } from '../../features/order/orderSlice'
import PaginationHook from '../../hooks/PaginationHook'
const ServerPagination = () => {
  const {
    page,
    totalOrders: count,
    limit,
  } = useSelector((state) => state.order)

  return (
    <Wrapper className='title'>
      <PaginationHook
        page={page}
        count={count}
        limit={limit}
        prev={prev}
        next={next}
        index={index}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .active {
    background-color: var(--primary-8);
  }
`
export default ServerPagination
