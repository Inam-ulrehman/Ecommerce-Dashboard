import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { showDashboard } from '../../features/user/userSlice'
import { dashboardNavLink } from '../../utils/data'

const DashboardNav = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)
  return (
    <Wrapper>
      <ul>
        <li onClick={() => dispatch(showDashboard())}>
          <Link to={'/dashboard'}>Dashboard</Link>
        </li>
        {dashboardNavLink.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          )
        })}
      </ul>

      <p>
        Welcome <strong>{user.userName.toUpperCase()}</strong>
      </p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ul {
    display: flex;
    li {
      padding: 0 1rem;
      a {
        color: black;
      }
    }
  }
  p {
    color: black;
    padding: 0 1rem;
    strong {
      border-bottom: 2px solid var(--primary-8);
    }
  }

  background-color: var(--primary-1);
`

export default DashboardNav
