import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import AdminRegisterUpdateUserInput from '../../components/user/AdminRegisterUpdateUserInput'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const AdminRegisterUser = () => {
  const { user } = useSelector((state) => state)

  // handle Submit ===
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user.name || !user.email) {
      return toast.error('Please Provide Name and Email.')
    }
    const { token } = getUserFromLocalStorage()
    try {
      const result = await customFetch.post('/auth/users', user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      toast.success(result.statusText)
    } catch (error) {
      toast.error(error.response.data.msg)
      console.log(error.response)
    }
  }

  if (user.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      <h3 className='title'>Register New User Form</h3>
      <AdminRegisterUpdateUserInput handleSubmit={handleSubmit} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  form {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    max-width: 80vw;
  }
`
export default AdminRegisterUser
