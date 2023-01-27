import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Search from '../../components/product/Search'
import ServerSidePagination from '../../components/product/ServerSidePagination'

import { showProductWarning } from '../../features/functions/functionSlice'
import {
  getProductDeleteId,
  getProductsThunk,
} from '../../features/products/productSlice'
import { formatDate, formatPrice } from '../../utils/helper'

const Products = () => {
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state)

  const { productsList, getProducts, page, count } = product

  const handleDelete = (_id) => {
    dispatch(showProductWarning())
    dispatch(getProductDeleteId(_id))
  }

  useEffect(() => {
    dispatch(getProductsThunk())
    // eslint-disable-next-line
  }, [getProducts])

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
      <table>
        <tbody>
          <tr>
            <th>PRODUCT IMAGE</th>
            <th>TITLE</th>
            <th>CATEGORY</th>
            <th>SUBCATEGORY</th>
            <th>AVAILABLE</th>
            <th>Created At</th>
            <th>FEATURE</th>
            <th>PRICE</th>
            <th>ACTIONS</th>
          </tr>

          {productsList?.map((item) => {
            return (
              <tr key={item._id}>
                <td className='image-holder'>
                  <img src={item.uploadImage[0].secure_url} alt={item.title} />
                </td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.subCategory}</td>
                <td>{item.inStock ? 'Available' : 'out-of-Stock'}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>{item.feature ? 'Feature' : null}</td>
                <td>{formatPrice(item.amount)}</td>
                <td className='buttons'>
                  <Link className='btn' to={item._id}>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    type='button'
                    className='btn'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* Pagination buttons */}
      <ServerSidePagination />
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
