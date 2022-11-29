import React from 'react'
import { Helmet } from 'react-helmet-async'

const About = () => {
  return (
    <>
      <Helmet>
        <title>About</title>
        <meta name='description' content='Welcome to our About Page' />
        <link rel='canonical' href='/about' />
      </Helmet>
      <h1>This is about page</h1>
    </>
  )
}

export default About
