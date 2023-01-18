import React from 'react'
import { useEffect } from 'react'
import SingleOrderUserCreateNotes from './SingleOrderUserCreateNotes'
import SingleOrderUserNotesHolder from './SingleOrderUserNotesHolder'

const SingleOrderUser = ({ _id }) => {
  useEffect(() => {}, [])
  return (
    <div>
      SingleOrderUser
      <hr />
      <SingleOrderUserCreateNotes />
      <SingleOrderUserNotesHolder />
    </div>
  )
}

export default SingleOrderUser
