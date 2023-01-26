import React from 'react'

import styled from 'styled-components'
import AdminRegisterUpdateUserInput from '../../components/user/AdminRegisterUpdateUserInput'

const AdminRegisterUser = () => {
  // handle Submit ===

  return (
    <Wrapper>
      <h3 className='title'>Register New User Form</h3>
      <AdminRegisterUpdateUserInput />
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
