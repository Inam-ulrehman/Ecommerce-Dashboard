import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getStateValues } from '../../features/products/productSlice'
import FormInput from '../FormInput'

const UploadSingleProduct = () => {
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state)
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  console.log(product.amount)
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <div>
          {/* title  */}
          <div>
            <FormInput
              name={'title'}
              value={product.title}
              onChange={handleChange}
            />
          </div>

          {/* category  */}
          <div>
            <FormInput
              name={'category'}
              value={product.category}
              onChange={handleChange}
            />
          </div>
          {/* amount  */}
          <div>
            <FormInput
              type={'number'}
              name={'amount'}
              value={product.amount}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* ===============div divider========= */}
        <div>
          {/* Stock  */}
          <div>
            <label className='form-label' htmlFor='stock'>
              Stock
            </label>
            <select
              onChange={handleChange}
              style={{ padding: '3px' }}
              className='form-input'
              name='totalStock'
              id=''
            >
              <option value={product.stock}>true</option>
              <option value={product.stock}>false</option>
            </select>
          </div>
          {/* subCategory  */}
          <div>
            <FormInput
              name={'subCategory'}
              value={product.subCategory}
              onChange={handleChange}
            />
          </div>
          {/* totalStock  */}
          <div>
            <FormInput
              type={'number'}
              name={'totalStock'}
              value={product.totalStock}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* ===============div divider========= */}
        <div>
          <label htmlFor='description'>Product Description</label>
          <textarea
            name='description'
            value={product.description}
            onChange={handleChange}
            id='description'
            cols='30'
            rows='10'
          ></textarea>
        </div>
        <button type='submit' className='btn'>
          Submit
        </button>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  form {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    min-width: 800px;
  }
`
export default UploadSingleProduct
