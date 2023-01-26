import React from 'react'

import styled from 'styled-components'
import AdminRegisterUpdateUserInput from '../../components/user/AdminRegisterUpdateUserInput'
import { customFetch } from '../../utils/axios'

const AdminRegisterUser = () => {
  const method = customFetch.post

  return (
    <Wrapper>
      <h3 className='title'>Register New User Form</h3>
      <AdminRegisterUpdateUserInput method={method} />
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
