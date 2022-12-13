import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
  editLocalImage,
  editProductThunk,
} from '../../features/products/editProductSlice'
import { deleteImageThunk } from '../../features/products/productSlice'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'
const user = getUserFromLocalStorage()
const EditUploadImage = () => {
  const dispatch = useDispatch()
  const [file, setFile] = useState(null)
  const { editProduct } = useSelector((state) => state)
  const { uploadImage } = editProduct

  // handle Change
  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  // handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      return toast.warning('Please Chose a file.')
    }
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await customFetch.post(
        '/products/uploadImage',
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      const newUploadImage = [...uploadImage, response.data]
      const newProduct = { ...editProduct, uploadImage: newUploadImage }
      dispatch(editProductThunk(newProduct))
      dispatch(editLocalImage(newUploadImage))
      setFile(null)
    } catch (error) {
      console.log(error.response)
    }
  }

  // handle Delete
  const handleDelete = async (public_id) => {
    if (editProduct.uploadImage.length === 1) {
      return toast.error('Must have one picture.')
    }
    const image = uploadImage.filter((item) => item.public_id !== public_id)
    dispatch(editLocalImage(image))
    const newProduct = { ...editProduct, uploadImage: image }
    dispatch(editProductThunk(newProduct))
    dispatch(deleteImageThunk(public_id))
  }

  return (
    <Wrapper>
      {/* ==== Uploading Image */}
      <div>
        <input type='file' onChange={handleChange} />
        <button type='submit' onClick={handleSubmit}>
          Upload
        </button>
      </div>
      {/* ==== Showing image Delete image */}
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
