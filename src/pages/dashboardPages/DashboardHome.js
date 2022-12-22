import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { DashboardTotalCard } from '../../components/cards'

const DashboardHome = () => {
  const { product } = useSelector((state) => state)

  return (
    <Wrapper>
      <DashboardTotalCard
        total={product.nbHits}
        navigateLink={'/dashboard/products'}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  gap: 1rem;
  justify-content: center;
`
export default DashboardHome
