import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import EditSingleProduct from '../components/product/EditSingleProduct'
import EditUploadImage from '../components/product/EditUploadImage'
import { singleProductThunk } from '../features/products/editProductSlice'

const SingleProduct = () => {
  const dispatch = useDispatch()

  const { _id } = useParams()

  useEffect(() => {
    dispatch(singleProductThunk(_id))
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <EditUploadImage />
      <EditSingleProduct />
    </div>
  )
}

export default SingleProduct
