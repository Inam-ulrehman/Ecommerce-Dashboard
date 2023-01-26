import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { List } from '../../components/contact'
import Pagination from '../../components/contact/Pagination'
import Search from '../../components/contact/Search'

const Contact = () => {
  const { page, count } = useSelector((state) => state.contact)

  return (
    <Wrapper>
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
  h4 {
    display: flex;
    justify-content: space-between;
  }
  .buttons {
    width: 160px;
    a {
      margin: 5px;
      padding: 1px 9px;
    }
  }

  .tr {
    text-align: center;
    td {
      text-transform: capitalize;
    }
  }
`
export default Contact
