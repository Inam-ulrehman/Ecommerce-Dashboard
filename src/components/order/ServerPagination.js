import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextOrder, prevOrder } from '../../features/order/orderSlice'

const ServerPagination = () => {
  const dispatch = useDispatch()
  const { order } = useSelector((state) => state)
  // const handleNext
  const handleNext = (e) => {}
  console.log('hello next')
  // const handlePrev
  const handlePrev = (e) => {
    // dispatch(prevOrder())
  }
  return (
    <div>
      <button className='btn' onClick={handlePrev}>
        Prev
      </button>
      <button className='btn' type='button' onClick={handleNext}>
        Next
      </button>
    </div>
  )
}

export default ServerPagination
