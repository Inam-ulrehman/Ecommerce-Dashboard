import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const initialState = {
  name: '',
  email: '',
  password: '',
  isLoading: false,
}

export const appointmentThunk = createAsyncThunk(
  'appointment/appointmentThunk',
  async (data, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.post(
        '/contentAboutUs/uploadImage',
        data,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      console.log('hello Thunk')
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
  },
  extraReducers: {
    [appointmentThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
      state.isLoading = true
    },
    [appointmentThunk.fulfilled]: (state, { payload }) => {
      console.log('promise full filled')
      state.isLoading = false
    },
    [appointmentThunk.rejected]: (state, { payload }) => {
      console.log('promise rejected')
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
  },
})
export const { createFunction } = appointmentSlice.actions
export default appointmentSlice.reducer
