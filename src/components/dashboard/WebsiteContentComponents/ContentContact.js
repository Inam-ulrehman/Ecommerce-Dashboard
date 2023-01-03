import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import FormInput from '../../FormInput'

const initialState = {
  address: '',
  mobileNumber: '',
  landLine: '',
  email: '',
}
const ContentContact = () => {
  const [state, setState] = useState(initialState)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        {/* Address */}
        <div>
          <FormInput
            name={'address'}
            onChange={handleChange}
            value={state.address}
          />
        </div>
        {/* mobileNumber */}
        <div className='number'>
          <FormInput
            label={'Mobile Number'}
            name={'mobileNumber'}
            type={'number'}
            onChange={handleChange}
            value={state.mobileNumber}
          />
        </div>
        {/* landLine */}
        <div className='number'>
          <FormInput
            label={'Land Line'}
            name={'landLine'}
            type={'number'}
            onChange={handleChange}
            value={state.landLine}
          />
        </div>
        {/* email */}
        <div>
          <FormInput
            name={'email'}
            onChange={handleChange}
            value={state.email}
          />
        </div>
        <button className='btn' type='submit'>
          Submit
        </button>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .number {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type='number'] {
      -moz-appearance: textfield;
    }
  }
`
export default ContentContact
