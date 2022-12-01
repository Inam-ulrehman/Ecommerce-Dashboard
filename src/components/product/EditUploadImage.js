import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
  editDeleteImage,
  editProductThunk,
} from '../../features/products/editProductSlice'
import { deleteImageThunk } from '../../features/products/productSlice'

const EditUploadImage = () => {
  const dispatch = useDispatch()
  const { editProduct } = useSelector((state) => state)
  const { uploadImage } = editProduct

  const handleDelete = async (public_id) => {
    if (editProduct.uploadImage.length === 1) {
      return toast.error('Must have one picture.')
    }
    const image = uploadImage.filter((item) => item.public_id !== public_id)
    dispatch(editDeleteImage(image))
    const newProduct = { ...editProduct, uploadImage: image }
    dispatch(editProductThunk(newProduct))
    dispatch(deleteImageThunk(public_id))
  }

  return (
    <Wrapper>
      {uploadImage?.map((item, index) => {
        return (
          <div className='container' key={index}>
            <div className='img-box'>
              <img src={item.secure_url} alt={editProduct.title} />
            </div>
            <button
              onClick={() => handleDelete(item.public_id)}
              type='button'
              className='btn btn-block'
            >
              Delete
            </button>
          </div>
        )
      })}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;

  padding: 1rem;
  .container {
    max-width: 110px;
    box-shadow: var(--shadow-1);
    margin-right: 1rem;
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
