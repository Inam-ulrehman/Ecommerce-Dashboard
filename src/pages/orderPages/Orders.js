import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import List from '../../components/order/List'
import Pagination from '../../components/order/Pagination'
import Search from '../../components/order/Search'

const Orders = () => {
  const { page, count } = useSelector((state) => state.order)
  return (
    <Wrapper>
      <div className='container-heading'>
        <Link className='btn' to={'register'}>
          Register New Order
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
  .buttons {
    width: 180px;
    a {
      padding: 1px 10px;
    }
    a,
    button {
      margin: 5px;
    }
  }
  .date {
    width: 130px;
  }
  .image {
    width: 70px;
    img {
      width: 100%;
    }
  }
  td {
    text-align: center;
  }
  .name {
    div {
      padding: 1rem;
    }
  }
  .quantity {
    div {
      padding: 1rem;
    }
  }
`
export default Orders
