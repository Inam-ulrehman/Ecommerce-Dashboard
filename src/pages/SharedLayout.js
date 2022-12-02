import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../components/footer/Footer'
import DesktopNavbar from '../components/navbar/DesktopNavbar'
import ProductWarning from '../components/product/ProductWarning'
import Warning from '../components/Warning'

const SharedLayout = () => {
  const { warning, productWarning } = useSelector((state) => state.function)
  return (
    <main>
      <DesktopNavbar />
      {warning && <Warning />}
      {productWarning && <ProductWarning />}
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
