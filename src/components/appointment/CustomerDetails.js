import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import FormInput from '../../components/FormInput'
import {
  clearState,
  getStateValues,
} from '../../features/appointment/appointmentSlice'

const CustomerDetails = ({ action }) => {
  const dispatch = useDispatch()
  const { name, email, phone, note, category, date, slot, updateId } =
    useSelector((state) => state.appointment)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!date || !slot || !name || !email || !phone) {
      return toast.warning('Please fill all details.')
    }
    dispatch(
      action({ name, email, phone, note, category, date, slot, updateId })
    )
    dispatch(clearState())
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  return (
    <Wrapper>
      <div className='customer-details'>
        <form className='form' onSubmit={handleSubmit}>
          {/* name */}
          <FormInput name='name' value={name} onChange={handleChange} />
          {/* email */}
          <FormInput name='email' value={email} onChange={handleChange} />
          {/* phone */}
          <FormInput
            name='phone'
            type='number'
            value={phone}
            onChange={handleChange}
          />
          {/* Note */}
          <div>
            <label className='form-label' htmlFor='note'>
              Note
            </label>
            <textarea
              className='form-textarea'
              name='note'
              id='note'
              cols='30'
              rows='10'
              value={note}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type='submit' className='btn'>
            Submit
          </button>
        </form>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div``
export default CustomerDetails
