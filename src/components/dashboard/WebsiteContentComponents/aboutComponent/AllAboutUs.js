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
    position: relative;
    background-color: var(--grey-2);
    transition: var(--transition-1);
    :hover {
      cursor: pointer;
      box-shadow: var(--shadow-3);
    }
  }
  .btn {
    position: absolute;
    right: 0;
  }
  .imageContainer {
    width: 300px;
    height: 300px;
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
    max-width: 250px;
  }
`

export default AllAboutUs
