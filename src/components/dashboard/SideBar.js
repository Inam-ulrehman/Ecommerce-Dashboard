import React from 'react'
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import { hideDashboard } from '../../features/user/userSlice'
import { DashboardSidebarNav } from '../../utils/data'

const SideBar = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(hideDashboard())
  }
  return (
    <ul>
      {DashboardSidebarNav.map((item, index) => {
        return (
          <li onClick={handleClick} key={index}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default SideBar
