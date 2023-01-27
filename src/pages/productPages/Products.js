import { React } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { List, Pagination } from '../../components/product'
import Search from '../../components/product/Search'

const Products = () => {
  const { product } = useSelector((state) => state)

  const { page, count } = product

  return (
    <Wrapper>
      <div className='container-heading'>
        <Link className='btn' to={'register'}>
          New Product
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
  .image-holder {
    img {
      max-width: 70px;
    }
  }
`
export default Products
