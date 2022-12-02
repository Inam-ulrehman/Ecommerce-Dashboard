import React from 'react'
import { Link } from 'react-router-dom'
import { DashboardSidebarNav } from '../../utils/data'

const SideBar = () => {
  const handleClick = () => {}
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
