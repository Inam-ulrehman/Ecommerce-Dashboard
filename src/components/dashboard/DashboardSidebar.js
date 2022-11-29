import React from 'react'
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import { hideDashboard } from '../../features/user/userSlice'
import { DashboardSidebar } from '../../utils/data'

const DashboardSideBar = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(hideDashboard())
  }
  return (
    <ul>
      {DashboardSidebar.map((item, index) => {
        return (
          <li onClick={handleClick} key={index}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default DashboardSideBar
