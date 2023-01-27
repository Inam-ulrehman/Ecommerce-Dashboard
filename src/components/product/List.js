import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate, formatPrice } from '../../utils/helper'
import styled from 'styled-components'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBack2Line } from 'react-icons/ri'
import Warning from '../Warning'
import { showWarning } from '../../features/functions/functionSlice'
import {
  deleteProductsThunk,
  getStateValues,
} from '../../features/products/productSlice'

const List = () => {
  const dispatch = useDispatch()
  const { product, function: warningHolder } = useSelector((state) => state)

  const handleDelete = (_id) => {
    const name = 'deleteId'
    const value = _id
    dispatch(getStateValues({ name, value }))
    dispatch(showWarning())
  }

  if (product.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      {/* Show warning  */}
      {warningHolder.warning && (
        <Warning
          action={() => dispatch(deleteProductsThunk(product.deleteId))}
        />
      )}
      {/* show table */}
      <table>
        <tbody>
          <tr>
            <th>PRODUCT IMAGE</th>
            <th>TITLE</th>
            <th>CATEGORY</th>
            <th>SUBCATEGORY</th>
            <th>AVAILABLE</th>
            <th>CREATED AT</th>
            <th>FEATURE</th>
            <th>PRICE</th>
            <th>ACTIONS</th>
          </tr>
          {product.list?.map((item) => {
            return (
              <tr key={item._id}>
                <td className='image-holder'>
                  <img src={item.uploadImage[0].secure_url} alt={item.title} />
                </td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.subCategory}</td>
                <td>{item.inStock ? 'Available' : 'out-of-Stock'}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>{item.feature ? 'Feature' : null}</td>
                <td>{formatPrice(item.amount)}</td>
                <td className='buttons'>
                  <Link className='btn' to={item._id}>
                    <FiEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className='btn'
                  >
                    <RiDeleteBack2Line />
                  </button>
                </td>
              </tr>
              // ===========
            )
          })}
        </tbody>
      </table>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  table {
    text-align: center;
    tbody {
      .btn {
        height: 40px;
        margin: 5px;
      }
      tr {
        .image-holder {
          width: 100px;

          img {
            display: block;
            margin-left: auto;
            margin-right: auto;
            max-width: 105px;
          }
        }
        th {
          text-transform: capitalize;
          box-shadow: var(--shadow-3);
          border: 2px solid var(--grey-5);
          background-color: var(--grey-2);
        }
        td {
          border: 2px solid var(--grey-5);
          background-color: var(--grey-1);
        }
      }
    }
  }
`

export default List
