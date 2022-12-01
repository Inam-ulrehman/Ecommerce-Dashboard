import React from 'react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from '../features/products/productSlice'

const Products = () => {
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state)
  const { isLoading, productsList } = product

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
    <div>
      <Helmet>
        <title>Product</title>
        <meta name='description' content='Welcome to our Product Page.' />
        <link rel='canonical' href='/product' />
      </Helmet>
      {productsList.map((item) => {
        return <div key={item._id}>hello</div>
      })}
    </div>
  )
}

export default Products
