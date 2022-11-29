import React from 'react'
import { Link } from 'react-router-dom'
import { DashboardSidebar } from '../../utils/data'

const DashboardSideBar = () => {
  return (
    <ul>
      {DashboardSidebar.map((item, index) => {
        return (
          <li key={index}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default DashboardSideBar
