import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { customFetch } from '../utils/axios'
import {
  getImageFromLocalStorage,
  setImageInLocalStorage,
} from '../utils/localStorage'

const UploadProduct = () => {
  const localUploadImage = getImageFromLocalStorage('uploadImage')
  const { user } = useSelector((state) => state)
  const [file, setFile] = useState(null)
  const [uploadImage, setUploadImage] = useState(localUploadImage || [])
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  //  upload Image
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    if (!file) {
      return toast.warning('Please Chose your file.')
    }
    if (uploadImage.length >= 6) {
      return toast.error('You can upload maximum 6 Pictures.')
    }
    setIsLoading(true)
    try {
      const response = await customFetch.post(
        '/products/uploadImage',
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      setUploadImage([...uploadImage, response.data])
      setFile(null)
      const upload = localUploadImage
        ? [...localUploadImage, response.data]
        : [response.data]

      setImageInLocalStorage(upload)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.msg)
      setIsLoading(false)
    }
  }
  // delete Image

  const handleDelete = async (public_id) => {
    const data = { public_id: public_id }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/products/deleteImage',
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      console.log(response)
      const newData = uploadImage.filter((item) => item.public_id !== public_id)
      setUploadImage(newData)
      setImageInLocalStorage(newData)
    } catch (error) {
      console.log(error.response)
    }
  }
  if (isLoading) {
    return <div>Loading...</div>
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
        {uploadImage.map((item, index) => {
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
export default UploadProduct
