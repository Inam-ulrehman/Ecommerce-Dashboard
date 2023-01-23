import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { customFetch } from '../../../utils/axios'
import { getUserFromLocalStorage } from '../../../utils/localStorage'
import FormInput from '../../FormInput'

const initialState = {
  startTime: '',
  endTime: '',
  available: true,
  isLoading: false,
  refreshData: false,
}
const Slots = () => {
  const [state, setState] = useState(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!state.startTime || !state.endTime) {
      return toast.error('Please fill both values.')
    }
    const { token } = getUserFromLocalStorage()
    await customFetch.post(`/slots`, state, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setState({
      ...state,
      refreshData: !state.refreshData,
      startTime: '',
      endTime: '',
    })
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }

  const handleDelete = async (_id) => {
    const { token } = getUserFromLocalStorage()
    const result = await customFetch.delete(`/slots/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(result)
    setState({ ...state, refreshData: !state.refreshData })
  }

  const fetchData = async () => {
    const { token } = getUserFromLocalStorage()
    const result = await customFetch.get(`/slots`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setState({ ...state, ...result.data })
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [state.refreshData])
  return (
    <Wrapper>
      <div className='create-slot'>
        <form className='form' onSubmit={handleSubmit}>
          <div className='title'>Add a slot.</div>
          {/* startTime */}
          <FormInput
            name='startTime'
            value={state.startTime}
            onChange={handleChange}
          />
          {/* endTime */}
          <FormInput
            name='endTime'
            value={state.endTime}
            onChange={handleChange}
          />

          <button type='submit' className='btn'>
            Add in List
          </button>
        </form>
      </div>
      <div className='slots-container'>
        <span>
          List of your slots. Total:<strong>{state.count}</strong>
        </span>
        <table>
          <tbody>
            <tr>
              <td>Start Time</td>
              <td>End Time</td>
              <td>Status</td>
              <td>Actions</td>
            </tr>
            {state?.slots?.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.startTime}</td>
                  <td>{item.endTime}</td>
                  <td>{item.available ? 'Available' : 'Not-Available'}</td>
                  <td className='btn-holder'>
                    <button className='btn'>Edit</button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className='btn'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  table {
    text-align: center;
  }
  .btn-holder {
    width: 160px;
    button {
      margin: 5px;
    }
  }
`
export default Slots
