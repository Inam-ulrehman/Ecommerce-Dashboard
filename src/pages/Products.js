import React from 'react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  deleteProductsThunk,
  getProductsThunk,
  updateProductList,
} from '../features/products/productSlice'

const Products = () => {
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state)
  const { isLoading, productsList } = product

  const handleDelete = (_id) => {
    dispatch(deleteProductsThunk(_id))
    const newProductList = productsList.filter((item) => item._id !== _id)
    dispatch(updateProductList(newProductList))
  }

  useEffect(() => {
    dispatch(getProductsThunk())
    // eslint-disable-next-line
  }, [])
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      <Helmet>
        <title>Product</title>
        <meta name='description' content='Welcome to our Product Page.' />
        <link rel='canonical' href='/product' />
      </Helmet>
      <table>
        <tbody>
          <tr>
            <th>PRODUCT IMAGE</th>
            <th>TITLE</th>
            <th>CATEGORY</th>
            <th>AVAILABLE</th>
            <th>ACTIONS</th>
          </tr>

          {productsList.map((item) => {
            return (
              <tr key={item._id}>
                <td className='image-holder'>
                  <img src={item.uploadImage[0].secure_url} alt={item.title} />
                </td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.inStock ? 'In-Stock' : 'out-of-Stock'}</td>
                <td>
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
    </Wrapper>
  )
}
const Wrapper = styled.div`
  text-align: center;
  .image-holder {
    max-width: 150px;
  }
  img {
    width: 100px;
  }
`
export default Products
