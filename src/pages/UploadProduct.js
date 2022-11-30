import React from 'react'
import styled from 'styled-components'
import UploadImage from '../components/product/UploadImage'
import UploadSingleProduct from '../components/product/UploadSingleProduct'

const UploadProduct = () => {
  return (
    <Wrapper>
      <UploadImage />
      <UploadSingleProduct />
    </Wrapper>
  )
}
const Wrapper = styled.div``
export default UploadProduct
