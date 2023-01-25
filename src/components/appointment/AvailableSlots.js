import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'
import { customFetch } from '../../utils/axios'
const initialState = {
  slot: [],
  count: '',
}
const AvailableSlots = () => {
  const [state, setState] = useState(initialState)
  const { appointment } = useSelector((state) => state)

  const handleSlotId = () => {}

  const fetchData = async () => {
    try {
      const freeSlots = await customFetch.post('/slots/available', {
        date: state.date,
      })
      console.log(freeSlots)
      const { count, result } = freeSlots.data
      setState({ ...state, slot: result, count: count })
    } catch (error) {
      console.log(error.freeSlots)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [appointment.date])
  return (
    <div>
      <div className='day-container'>
        <div className='date-holder'>
          <span>{moment(appointment.date).format('dddd')} </span>
          <span>
            Total Available Dates: <strong>{state.count}</strong>
          </span>
        </div>
        <div className='day-body'>
          {state.slot.map((item, index) => {
            return (
              <div
                className={
                  item._id === state.bookingId
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
    </div>
  )
}

export default AvailableSlots
