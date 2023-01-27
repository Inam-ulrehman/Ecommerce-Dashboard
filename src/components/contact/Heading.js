import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Heading = () => {
  const { count, page } = useSelector((state) => state.contact)
  return (
    <Wrapper className='container-heading'>
      <div className='container-heading'>
        <span></span>
        <span>
          Total Results:
          <strong> {count}</strong>
        </span>
        <span>
          Page No:<strong>{page}</strong>
        </span>
      </div>
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
