import React from 'react'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { List, Pagination, Search } from '../../components/appointment'

const Appointment = () => {
  const { count, page } = useSelector((state) => state.appointment)
  return (
    <Wrapper>
      <div className='container-heading'>
        <Link className='btn' to={'register'}>
          Register New Appointment
        </Link>

        <span>
          Total Results:
          <strong> {count}</strong>
        </span>
        <span>
          Page No:<strong>{page}</strong>
        </span>
      </div>
      <Search />
      <List />
      <Pagination />
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

export default Appointment
