import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { DashboardTotalCard } from '../../components/cards'
import { getProductsThunk } from '../../features/products/productSlice'
import { getOrdersThunk } from '../../features/order/orderSlice'
import { getContactThunk } from '../../features/contact/contactSlice'
import { getUsersThunk } from '../../features/user/userSlice'
import { appointmentThunk } from '../../features/appointment/appointmentSlice'

const DashboardHome = () => {
  const { product, order, contact, user, appointment } = useSelector(
    (state) => state
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsThunk())
    dispatch(getOrdersThunk(order))
    dispatch(getContactThunk(contact))
    dispatch(getUsersThunk(user))
    dispatch(appointmentThunk(appointment))

    // eslint-disable-next-line
  }, [])
  return (
    <Wrapper>
      {/* Product Card */}
      <DashboardTotalCard
        title={`Products`}
        total={product.nbHits}
        navigateLink={'/dashboard/products'}
      />
      {/* Order Card */}
      <DashboardTotalCard
        title={`Orders`}
        total={order.count}
        navigateLink={'/dashboard/orders'}
      />
      {/* Contact Card */}
      <DashboardTotalCard
        title={`Contacts`}
        total={contact.count}
        navigateLink={'/dashboard/Contact'}
      />
      {/* User Card */}
      <DashboardTotalCard
        title={`Users`}
        total={user?.count}
        navigateLink={'/dashboard/users'}
      />
      {/* User Card */}
      <DashboardTotalCard
        title={`Appointment`}
        total={appointment?.count}
        navigateLink={'/dashboard/appointments'}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  gap: 1rem;
`
export default DashboardHome
