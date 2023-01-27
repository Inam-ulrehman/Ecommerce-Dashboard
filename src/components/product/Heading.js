import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Heading = () => {
  const { count, page } = useSelector((state) => state.product)
  return (
    <Wrapper className='container-heading'>
      <Link className='btn' to={'/dashboard/upload'}>
        New Product
      </Link>
      <span>
        Total Results:
        <strong> {count}</strong>
      </span>
      <span>
        Page No:<strong>{page}</strong>
      </span>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .container-heading {
    display: flex;
    justify-content: space-between;
    span {
      padding: 0 2rem;
    }
  }
`
export default Heading
