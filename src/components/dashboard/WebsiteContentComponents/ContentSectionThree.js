import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import FormInput from '../../FormInput'

const initialState = {
  heading: '',
  buttonTitle: '',
  desktopImage: '',
  mobileImage: '',
  paragraph: '',
}
const ContentSectionThree = () => {
  const [state, setState] = useState(initialState)

  const handleSubmit = (e) => {
    console.log(e)
  }
  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setState({ ...state, [name]: value })
  }
  return (
    <Wrapper>
      <h3>Section-3</h3>
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
        {/* Mobile Image */}
        <div>
          <FormInput
            label={'Mobile Image'}
            name={'mobileImage'}
            value={state.mobileImage}
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
        <button type='submit' className='btn'>
          Submit
        </button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div``
export default ContentSectionThree
