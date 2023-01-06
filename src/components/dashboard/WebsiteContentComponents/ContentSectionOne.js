import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { customFetch } from '../../../utils/axios'
import {
  getItemFromLocalStorage,
  getUserFromLocalStorage,
  setItemInLocalStorage,
} from '../../../utils/localStorage'
import FormInput from '../../FormInput'
import UploadImage from '../../UploadImage'
const user = getUserFromLocalStorage()
const LocalStorageUploadImage = getItemFromLocalStorage('sectionOneImage')

const initialState = {
  _id: 0,
  heading: '',
  buttonTitle: '',
  paragraph: '',
  uploadImage: LocalStorageUploadImage || '',
  isLoading: false,
}
const ContentSectionOne = () => {
  const [state, setState] = useState(initialState)

  // ====Handle Submit ====
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!state.uploadImage) {
      return toast.error('please upload image first.')
    }
    if ((!state.heading, !state.buttonTitle, !state.paragraph)) {
      return toast.error('Please fill all fields.')
    }
    try {
      const result = await customFetch.post('/sectionOne', state, {
        headers: {
          Authorization: `Bearer ${user?.token} `,
        },
      })

      toast.success(result.statusText)
    } catch (error) {
      console.log(error)
    }
  }
  // ====handle Change=====

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setState({ ...state, [name]: value })
  }
  // ======cb Function======
  const cbFunction = (result) => {
    const name = 'sectionOneImage'
    const uploadImage = result.data.uploadImage
    setItemInLocalStorage(name, uploadImage)
    setState({ ...state, uploadImage: result.data.uploadImage })
  }

  // =====fetch Data=====

  const fetchData = async () => {
    setState({ ...state, isLoading: true })
    try {
      const result = await customFetch('/sectionOne')

      if (result.data.msg === 'folder is empty.') {
        setState({ ...state, isLoading: false })
        return
      }
      const data = result?.data?.sectionOne
      setState({ ...state, ...data, isLoading: false })
    } catch (error) {
      setState({ ...state, isLoading: false })
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])
  if (state.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      <h3>Section-1</h3>
      <UploadImage
        path={`/sectionOne/${state._id}`}
        cbFunction={cbFunction}
        state={state}
        setState={setState}
      />
      <form className='form' onSubmit={handleSubmit}>
        {/* heading  */}
        <div>
          <FormInput
            label={'Heading'}
            name={'heading'}
            value={state.heading}
            onChange={handleChange}
          />
        </div>
        {/* paragraph */}
        <div>
          <FormInput
            label={'Paragraph'}
            name={'paragraph'}
            value={state.paragraph}
            onChange={handleChange}
          />
        </div>
        {/* Button Title  */}
        <div>
          <FormInput
            label={'Button Title'}
            name={'buttonTitle'}
            value={state.buttonTitle}
            onChange={handleChange}
          />
        </div>
        {/* desktop Image */}
        <div>
          <FormInput
            label={'Desktop Image Link'}
            name={'desktopImage'}
            value={state.uploadImage?.secure_url}
            onChange={handleChange}
            disabled
          />
        </div>

        <button type='submit' className='btn'>
          Submit
        </button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div``
export default ContentSectionOne
