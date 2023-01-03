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

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])
  return (
    <Wrapper>
      <div className='container'>
        {state.aboutUsList.map((item) => {
          return (
            <div className='containerHolder'>
              <div className='imageContainer'>
                <img src={item.uploadImage[0].secure_url} alt={item.name} />
              </div>
              <div className='body'>
                <span>{item.name}</span>
                <span>{item.profession}</span>
              </div>
              <hr />
              <div className='footer'>
                <p>{capitalizeFirstLetter(item.paragraph)}</p>
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
    margin-left: 1rem;
    gap: 1rem;
  }
  .containerHolder {
    background-color: var(--grey-2);
  }

  .imageContainer {
    width: 250px;
    height: 250px;
    img {
      width: 100%;
    }
  }
  .body {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    text-transform: uppercase;
  }
  .footer {
    padding: 0 1rem;
  }
`

export default AllAboutUs
