import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const initialState = {
  // search
  searchName: '',
  searchEmail: '',
  searchPhone: '',
  searchDate: '',
  // pagination
  list: [],
  page: 1,
  limit: 10,
  count: '',
  sort: '-createdAt',
  searchConfirmed: false,
  isLoading: false,
  // register
  name: '',
  email: '',
  phone: '',
  note: '',
  category: '',
  date: new Date().toLocaleDateString('en-ca'),
  bookingId: '',
  availableTimes: '',
  slot: [],
}

// Get appointments
export const appointmentThunk = createAsyncThunk(
  'appointment/appointmentThunk',
  async (state, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.get(
        `/appointments?name=${state?.searchName}&email=${state?.searchEmail}&phone=${state?.searchPhone}&date=${state?.searchDate}&sort=${state?.sort}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// get Slots

export const availableSlotsThunk = createAsyncThunk(
  'appointment/availableSlotsThunk',
  async (state, thunkAPI) => {
    try {
      const response = await customFetch.post('/slots/available', {
        date: state.date,
      })
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    getStateValues: (state, { payload }) => {
      const { name, value } = payload
      state[name] = value
    },
    //======pagination=======
    next: (state, { payload }) => {
      state.page = state.page + 1
    },
    prev: (state, { payload }) => {
      state.page = state.page - 1
    },
    index: (state, { payload }) => {
      const index = Number(payload)
      state.page = index
    },
  },
  extraReducers: {
    [appointmentThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [appointmentThunk.fulfilled]: (state, { payload }) => {
      state.list = payload.result
      state.count = payload.totalOrders
      state.isLoading = false
    },
    [appointmentThunk.rejected]: (state, { payload }) => {
      console.log('promise rejected')
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // available slot
    [availableSlotsThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
      state.isLoading = true
    },
    [availableSlotsThunk.fulfilled]: (state, { payload }) => {
      console.log('promise full filled')
      state.isLoading = false
    },
    [availableSlotsThunk.rejected]: (state, { payload }) => {
      console.log('promise rejected')
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
  },
})
export const { createFunction, getStateValues, next, prev, index } =
  appointmentSlice.actions
export default appointmentSlice.reducer
