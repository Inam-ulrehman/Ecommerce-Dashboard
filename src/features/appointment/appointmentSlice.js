import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const initialState = {
  searchName: '',
  searchEmail: '',
  searchPhone: '',
  searchDate: '',
  list: [],
  page: 1,
  limit: 10,
  sort: '-createdAt',
  searchConfirmed: false,
  count: '',
  isLoading: false,
}

export const appointmentThunk = createAsyncThunk(
  'appointment/appointmentThunk',
  async (state, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.get(
        `/appointments?name=${state?.searchName}&email=${state?.searchEmail}&phone=${state?.searchPhone}&sort=${state?.sort}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      console.log('hello Thunk')
      console.log(response)
      return response.data
    } catch (error) {
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
  },
  extraReducers: {
    [appointmentThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
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
  },
})
export const { createFunction, getStateValues } = appointmentSlice.actions
export default appointmentSlice.reducer
