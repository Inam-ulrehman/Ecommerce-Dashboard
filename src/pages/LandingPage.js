import React from 'react'
import { Helmet } from 'react-helmet-async'

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name='description' content='Welcome to our home Page' />
        <link rel='canonical' href='/' />
      </Helmet>
      <h1>this is our landing page</h1>
    </>
  )
}

export default LandingPage
