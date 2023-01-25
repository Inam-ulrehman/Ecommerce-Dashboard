import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment/moment'
import { customFetch } from '../../utils/axios'
import styled from 'styled-components'
import { getStateValues } from '../../features/appointment/appointmentSlice'
const initialState = {
  slots: [],
  count: '',
}
const AvailableSlots = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState(initialState)
  const { appointment } = useSelector((state) => state)

  const handleSlotId = (_id) => {
    const value = state.slots.find((item) => item._id === _id)
    const name = 'slot'
    dispatch(getStateValues({ name, value }))
  }

  const fetchData = async () => {
    try {
      const freeSlots = await customFetch.post('/slots/available', {
        date: appointment.date,
      })
      const { count, result } = freeSlots.data
      setState({ ...state, slots: result, count: count })
    } catch (error) {
      console.log(error.freeSlots)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [appointment.date, appointment.refreshSlotData])
  return (
    <Wrapper>
      {/* close sunday text */}
      {moment(appointment.date).format('dddd') === 'Sunday' && (
        <h4>Sorry we're closed sundays.</h4>
      )}

      {/* open days text  */}

      {state.count === 0 ? (
        <div>Sorry no availability.</div>
      ) : (
        <div>
          {moment(appointment.date).format('dddd') !== 'Sunday' && (
            <div className='day-container'>
              <div className='date-holder'>
                <span>{moment(appointment.date).format('dddd')} </span>
                <span>
                  Total Available Dates: <strong>{state.count}</strong>
                </span>
              </div>
              <div className='day-body'>
                {state.slots.map((item, index) => {
                  return (
                    <div
                      className={
                        item._id === appointment.slot._id
                          ? 'day-holder active'
                          : 'day-holder'
                      }
                      onClick={() => handleSlotId(item._id)}
                      key={index}
                    >
                      {item.startTime} - {item.endTime}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .day-container {
    .date-holder {
      span {
        margin: 1rem;
      }
    }

    .day-body {
      display: flex;
      flex-wrap: wrap;
      border: 2px solid black;
    }
    .day-holder {
      box-shadow: var(--shadow-1);
      margin: 1rem;
      padding: 1rem;
      transition: var(--transition-1);
      :hover {
        background-color: var(--green-light);

        cursor: pointer;
      }
    }
  }
  .active {
    background-color: var(--green-light);
  }
`
export default AvailableSlots
