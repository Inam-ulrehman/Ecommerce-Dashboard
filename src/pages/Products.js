import React from 'react'
import { Helmet } from 'react-helmet-async'

const Products = () => {
  return (
    <div>
      <Helmet>
        <title>Product</title>
        <meta name='description' content='Welcome to our Product Page.' />
        <link rel='canonical' href='/product' />
      </Helmet>
      Products
    </div>
  )
}

export default Products
