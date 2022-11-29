import React from 'react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { DashboardSideBar } from '../components/dashboard'

const Dashboard = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/dashboard/products')
  }, [])
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
        <Outlet />
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
