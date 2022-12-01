import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const EditUploadImage = () => {
  const { editProduct } = useSelector((state) => state)
  const { uploadImage } = editProduct
  return (
    <Wrapper>
      {uploadImage?.map((item, index) => {
        return (
          <div className='container' key={index}>
            <div className='img-box'>
              <img src={item.secure_url} alt={editProduct.title} />
            </div>
            <button type='button' className='btn btn-block'>
              Delete
            </button>
          </div>
        )
      })}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  padding: 1rem;
  .container {
    max-width: 110px;
    box-shadow: var(--shadow-1);
  }
  button {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .img-box {
    text-align: center;
    border: 2px solid black;
    border-bottom: transparent;
    overflow: hidden;
  }
  img {
    width: 100px;
  }
`
export default EditUploadImage
