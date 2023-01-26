import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../components/footer/Footer'
import DesktopNavbar from '../components/navbar/DesktopNavbar'
import OrderWarning from '../components/order/OrderWarning'
import ProductWarning from '../components/product/ProductWarning'

const SharedLayout = () => {
  const { productWarning, orderWarning } = useSelector(
    (state) => state.function
  )
  return (
    <main>
      <DesktopNavbar />
      {productWarning && <ProductWarning />}
      {orderWarning && <OrderWarning />}
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Footer />
    </main>
  )
}
const Wrapper = styled.section`
  margin-top: 3.2rem;
`
export default SharedLayout
