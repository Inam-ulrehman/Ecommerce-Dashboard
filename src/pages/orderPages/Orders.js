import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getOrdersThunk } from '../../features/order/orderSlice'

const Orders = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrdersThunk())
    // eslint-disable-next-line
  }, [])
  return <div>Orders</div>
}

export default Orders
