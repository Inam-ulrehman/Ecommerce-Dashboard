import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAboutUsValues } from '../../../../features/aboutUs/aboutUsSlice'
import FormInput from '../../../FormInput'

const UploadAboutUs = () => {
  const dispatch = useDispatch()
  const { name, profession, paragraph } = useSelector((state) => state.aboutUs)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    dispatch(getAboutUsValues({ name, value }))
  }
  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <FormInput name='name' value={name} onChange={handleChange} />
        </div>
        {/* Profession */}
        <div>
          <FormInput
            name='profession'
            value={profession}
            onChange={handleChange}
          />
        </div>
        {/* paragraph */}
        <div>
          <label htmlFor='paragraph'>
            <textarea
              name='paragraph'
              id='paragraph'
              cols='40'
              rows='10'
              value={paragraph}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>
      </form>
    </div>
  )
}

export default UploadAboutUs
