import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
  editProductThunk,
  getEditProductValue,
} from '../../features/products/editProductSlice'
import FormInput from '../FormInput'

const EditSingleProduct = () => {
  const dispatch = useDispatch()
  const { editProduct: product } = useSelector((state) => state)
  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    const { title, amount, category, description } = product
    if (!title || !amount || !category || !description) {
      return toast.warning('Please fill all REQUIRED fields.')
    }

    dispatch(editProductThunk(product))
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getEditProductValue({ name, value }))
  }

  return (
    <Wrapper>
      {/* ==== VALUE INPUT */}

      {/* ====FORM INPUT */}
      <form className='form' onSubmit={handleSubmit}>
        <div>
          {/* title  */}
          <div>
            <FormInput
              placeholder={'required'}
              name={'title'}
              value={product.title}
              onChange={handleChange}
            />
          </div>

          {/* category  */}
          <div>
            <FormInput
              placeholder={'required'}
              name={'category'}
              value={product.category}
              onChange={handleChange}
            />
          </div>
          {/* amount  */}
          <div>
            <FormInput
              placeholder={'required'}
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
              name='inStock'
              id=''
            >
              <option value={product.stock}>true</option>
              <option value={product.stock}>false</option>
            </select>
          </div>
          {/* subCategory  */}
          <div>
            <FormInput
              placeholder={'Optional not required.'}
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
            placeholder={'REQUIRED'}
            name='description'
            value={product.description}
            onChange={handleChange}
            id='description'
            cols='30'
            rows='10'
          ></textarea>
        </div>
        <button disabled={product.isLoading} type='submit' className='btn'>
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
export default EditSingleProduct
