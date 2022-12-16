import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const user = getUserFromLocalStorage()
const initialState = {
  phone: '',
  email: '',
  payment_intent: '',
  _id: '',
  sort: '-createdAt',
  page: 1,
  orderList: [],
  totalOrders: '',
  isLoading: false,
}

export const orderThunk = createAsyncThunk(
  'order/orderThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get()
      console.log('hello Thunk')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// Get All Orders
export const getOrdersThunk = createAsyncThunk(
  'order/getOrdersThunk',
  async (query, thunkAPI) => {
    try {
      const response = await customFetch.get(
        `/admin/orders?phone=${query?.phone}&email=${query?.email}&_id=${query?._id}&payment_intent=${query?.payment_intent}&sort=${query?.sort}&page=${query?.page}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )

      return response.data
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    nextOrder: (state, { payload }) => {
      // state.page = state.page + 1
      console.log('next')
    },
    prevOrder: (state, { payload }) => {
      state.page = state.page - 1
    },
  },
  extraReducers: {
    [orderThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
      state.isLoading = true
    },
    [orderThunk.fulfilled]: (state, { payload }) => {
      console.log('promise full filled')
      state.isLoading = false
    },
    [orderThunk.rejected]: (state, { payload }) => {
      console.log('promise rejected')
      state.isLoading = false
    },
    // Get All Orders
    [getOrdersThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getOrdersThunk.fulfilled]: (state, { payload }) => {
      state.orderList = payload.result
      state.totalOrders = payload.totalOrders
      state.isLoading = false
    },
    [getOrdersThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
  },
})
export const { createFunction, nextOrder, prevOrder } = orderSlice.actions
export default orderSlice.reducer
