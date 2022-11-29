import React from 'react'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

const Dashboard = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>Dashboard</title>
        <meta name='description' content='Welcome to your Dashboard.' />
        <link rel='canonical' href='/Dashboard' />
      </Helmet>
      Dashboard page
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: calc(100vh - 3.2rem);
`
export default Dashboard
