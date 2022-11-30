import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import DashboardSideBar from '../components/dashboard/DashboardSideBar'

const Dashboard = () => {
  const { user } = useSelector((state) => state)

  return (
    <Wrapper>
      <Helmet>
        <title>Dashboard</title>
        <meta name='description' content='Welcome to your Dashboard.' />
        <link rel='canonical' href='/Dashboard' />
      </Helmet>
      <div className='box box-1-sidebar'>
        <DashboardSideBar />
      </div>
      <div className='box box-2-dashboard'>
        {user.showDashboard && <div>Show your desktop</div>}
        <div>{!user.showDashboard && <Outlet />}</div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: calc(100vh - 3.2rem);
  display: flex;
  .box {
    border: 2px solid black;
  }
  .box-1-sidebar {
    width: 300px;
  }
  .box-2-dashboard {
    width: 100%;
  }
`
export default Dashboard
