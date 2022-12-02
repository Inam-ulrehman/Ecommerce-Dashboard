import React from 'react'

const Pagination = ({ index, setIndex, productsList }) => {
  return (
    <div>
      <div>
        <button className='btn' type='button'>
          Previous
        </button>
        {productsList?.map((item, index) => {
          return <button key={index}>{index}</button>
        })}
        <button className='btn' type='button'>
          next
        </button>
      </div>
    </div>
  )
}

export default Pagination
