import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Heading = () => {
  const { count, page } = useSelector((state) => state.appointment)
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
  border: 2px solid pink;
  display: flex;
  justify-content: space-between;
`
export default Heading
