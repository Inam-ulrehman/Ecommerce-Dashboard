import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
  deleteImageThunk,
  uploadImageThunk,
} from '../../features/products/productSlice'

const UploadImage = () => {
  const dispatch = useDispatch()
  const [file, setFile] = useState(null)
  const { product } = useSelector((state) => state)

  const handleChange = (e) => {
    setFile(e.target.files[0])
  }
  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file) {
      return toast.warning('Please Chose a file.')
    }
    const formData = new FormData()
    formData.append('file', file)
    dispatch(uploadImageThunk(formData))
    setFile(null)
  }
  // handle Delete
  const handleDelete = (public_id) => {
    dispatch(deleteImageThunk(public_id))
  }
  return (
    <Wrapper>
      <div>
        <input type='file' onChange={handleChange} />
        <button type='submit' onClick={handleSubmit}>
          Upload
        </button>
      </div>
      <div className='image-container'>
        {product.uploadImage.map((item, index) => {
          return (
            <div className='container' key={index}>
              <img src={item.url} alt='product' />
              <div className='btn-container'>
                <button
                  onClick={() => handleDelete(item.public_id)}
                  className='btn btn-block'
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .image-container {
    display: flex;
    flex-wrap: wrap;

    .container {
      max-width: 150px;
      max-height: 150px;
      overflow: hidden;
      text-align: center;
      box-shadow: var(--shadow-1);
      margin: 0.5rem;
      img {
        width: 70%;
      }
      .btn {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
  }
`

export default UploadImage
