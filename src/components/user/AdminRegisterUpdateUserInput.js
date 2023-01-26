import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStateValues } from '../../features/user/userSlice'
import FormInput from '../FormInput'

const AdminRegisterUpdateUserInput = ({ handleSubmit }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <div className='box-1'>
          {/* name input */}
          <FormInput name='name' value={user.name} onChange={handleChange} />
          {/* lastName input */}
          <FormInput
            name='lastName'
            label='Last Name'
            value={user.lastName}
            onChange={handleChange}
          />
          {/* phone input */}
          <FormInput
            name='phone'
            type='number'
            value={user.phone}
            onChange={handleChange}
          />
          {/* email input */}
          <FormInput name='email' value={user.email} onChange={handleChange} />
        </div>
        {/* ====================Box Divider=============*/}
        <div className='box-2'>
          {/* addaddress input */}
          <FormInput
            name='address'
            value={user.address}
            onChange={handleChange}
          />
          {/* city input */}
          <FormInput name='city' value={user.city} onChange={handleChange} />
          {/* province input */}
          <FormInput
            name='province'
            value={user.province}
            onChange={handleChange}
          />
          {/* postalCode  input */}
          <FormInput
            name='postalCode'
            label='Postal Code'
            value={user.postalCode}
            onChange={handleChange}
          />
          <button className='btn' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default AdminRegisterUpdateUserInput
