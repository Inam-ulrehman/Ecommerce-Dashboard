import React from 'react'
import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { customFetch } from '../utils/axios'
const image =
  'https://res.cloudinary.com/inam6530/image/upload/v1667130716/inamwebsolutions/Untitled_design_1_tr1efo.svg'

const Contact = () => {
  const nameRef = useRef(null)
  const mobileRef = useRef(null)
  const emailRef = useRef(null)
  const messageRef = useRef(null)

  const handleSubmit = async (e) => {
    // Prepare axios and good to go.
    e.preventDefault()
    let name = nameRef.current.value
    let mobile = mobileRef.current.value
    let email = emailRef.current.value
    let message = messageRef.current.value
    if (!name || !mobile || !email || !message) {
      return toast.warning('Please fill all fields.')
    } else {
      try {
        const response = await customFetch.post('forms', {
          name,
          mobile,
          email,
          message,
        })
        toast.success(
          `Hello, ${response.data.form.name} a team member will in touch with you soon.`
        )
        nameRef.current.value = ''
        mobileRef.current.value = ''
        emailRef.current.value = ''
        messageRef.current.value = ''
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <>
      <Helmet>
        <title>Contact</title>
        <meta name='description' content='Welcome to our Contact Form' />
        <link rel='canonical' href='/contact' />
      </Helmet>
      <Wrapper>
        <form onSubmit={handleSubmit} className='form'>
          <h1 className='title'>Get In Touch with us</h1>
          <div className='title-underline'></div>
          {/* name */}
          <div>
            <label htmlFor='name' className='form-label'>
              Full Name
            </label>
            <input className='form-input' type='text' ref={nameRef} />
          </div>
          {/* Mobile */}
          <div>
            <label htmlFor='Mobile' className='form-label'>
              Mobile Number
            </label>
            <input className='form-input' type='number' ref={mobileRef} />
          </div>
          {/* Email */}
          <div>
            <label htmlFor='email' className='form-label'>
              Email Address
            </label>
            <input className='form-input' type='text' ref={emailRef} />
          </div>
          {/* Message */}
          <div>
            <label htmlFor='message' className='form-label'>
              Message
            </label>
            <textarea
              className='form-input'
              type='text'
              cols='50'
              rows='5'
              ref={messageRef}
            />
          </div>
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </form>
        <div className='contactImage'>
          <img src={image} alt='contactUs' />
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  padding-top: 3rem;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  min-height: 100vh;

  h1 {
    margin-top: 0;
    font-size: 1rem;
  }
  /* margin: 0; */

  .contactImage {
    padding: 1rem;
    img {
      width: 40vw;
    }
  }

  @media (max-width: 720px) {
    .contactImage {
      display: none;
    }
  }
`
export default Contact
