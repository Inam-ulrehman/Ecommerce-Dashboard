import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { customFetch } from '../utils/axios'

const UploadProduct = () => {
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  //  upload Image
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData()
    formData.append('image', file)
    if (!file) {
      setIsLoading(false)
      return toast.warning('please upload picture')
    }
    try {
      const response = await customFetch.post('/products/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      setIsLoading(false)
      console.log(response)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  if (isLoading) {
    ;<div>Loading</div>
  }
  return (
    <div>
      <div>
        <input type='file' onChange={handleChange} />
        <button type='submit' onClick={handleSubmit}>
          Upload
        </button>
      </div>
    </div>
  )
}

export default UploadProduct
