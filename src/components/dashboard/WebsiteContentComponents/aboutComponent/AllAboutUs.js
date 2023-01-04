import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { customFetch } from '../../../../utils/axios'
import { capitalizeFirstLetter } from '../../../../utils/helper'
import { getUserFromLocalStorage } from '../../../../utils/localStorage'
const initialState = {
  aboutUsList: [],
}
const user = getUserFromLocalStorage()

const AllAboutUs = () => {
  const [state, setState] = useState(initialState)
  const getData = async () => {
    try {
      const result = await customFetch('/contentAboutUs/admin', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      const aboutUsList = result.data.contentAboutUss
      setState({ ...state, aboutUsList })
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = (public_id, _id) => {
    const data = { public_id, _id }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])
  return (
    <Wrapper>
      <div className='container'>
        {state.aboutUsList.map((item, index) => {
          return (
            <div className='containerHolder' key={index}>
              <button
                className='btn'
                onClick={() =>
                  handleDelete(item.uploadImage[0].public_id, item._id)
                }
              >
                x
              </button>
              <div className='image'>
                <img src={item.uploadImage[0].secure_url} alt={item.name} />
              </div>
              <div className='body'>
                <div className='spanHolder'>
                  <span>{item.name}</span>
                  <span>{item.profession}</span>
                </div>
                <p className='text-small'>{item.paragraph}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .containerHolder {
    border-top-left-radius: var(--radius-2);
    border-top-right-radius: var(--radius-2);
    box-shadow: var(--shadow-2);
    width: 80vw;
    margin: 1rem auto;
    padding-top: 1rem;
    background: var(--grey-4);

    img {
      width: 80vw;
      height: 30vh;
      object-fit: contain;
      border-bottom: 2px solid var(--primary-5);
    }
    .body {
      margin-top: -8px;
      padding: 1rem;
      background: var(--white);
    }
    .spanHolder {
      display: flex;
      justify-content: space-between;
      text-transform: capitalize;
    }
    p {
      margin-bottom: 0;
      color: var(--grey-5);
    }
    @media (min-width: 600px) {
      width: 45vw;
      img {
        width: 45vw;
      }
    }
    @media (min-width: 1024px) {
      width: 30vw;
      img {
        width: 30vw;
      }
    }
  }
`

export default AllAboutUs
