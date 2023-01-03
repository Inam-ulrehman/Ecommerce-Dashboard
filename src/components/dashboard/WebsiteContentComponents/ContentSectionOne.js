import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { customFetch } from '../../../utils/axios'
import { getUserFromLocalStorage } from '../../../utils/localStorage'
import FormInput from '../../FormInput'
const user = getUserFromLocalStorage()

const initialState = {
  heading: '',
  buttonTitle: '',
  desktopImage: '',
  paragraph: '',
  isLoading: false,
}
const ContentSectionOne = () => {
  const [state, setState] = useState(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await customFetch.post('/sectionOne', state, {
        headers: {
          Authorization: `Bearer ${user?.token} `,
        },
      })
      console.log(result)
      toast.success(result.statusText)
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setState({ ...state, [name]: value })
  }

  const getData = async () => {
    setState({ isLoading: true })
    try {
      const result = await customFetch('/sectionOne')
      const data = result?.data?.sectionOne
      setState({ isLoading: false })
      setState(data)
    } catch (error) {
      setState({ isLoading: false })
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
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
            label={'Desktop Image'}
            name={'desktopImage'}
            value={state.desktopImage}
            onChange={handleChange}
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
