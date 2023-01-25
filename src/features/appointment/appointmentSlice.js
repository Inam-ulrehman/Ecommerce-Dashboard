import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const initialState = {
  // register
  name: '',
  email: '',
  phone: '',
  note: '',
  category: '',
  date: new Date().toLocaleDateString('en-ca'),
  availableTimes: '',
  slot: {},
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

// Create Appointments
export const createAppointmentThunk = createAsyncThunk(
  'appointment/createAppointmentThunk',
  async (state, thunkAPI) => {
    const { token } = getUserFromLocalStorage()

    try {
      const response = await customFetch.post('/appointments', state, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// Delete Appointments
export const deleteAppointmentThunk = createAsyncThunk(
  'appointment/deleteAppointmentThunk',
  async (_id, thunkAPI) => {
    const { token } = getUserFromLocalStorage()

    try {
      const response = await customFetch.delete(`/appointments/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },

    // create Appointment
    [createAppointmentThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [createAppointmentThunk.fulfilled]: (state, { payload }) => {
      toast.success('Appointment created.')
      state.name = ''
      state.email = ''
      state.email = ''
      state.phone = ''
      state.note = ''
      state.category = ''
      state.date = new Date().toLocaleDateString('en-ca')
      state.availableTimes = ''
      state.slot = {}
      state.isLoading = false
    },
    [createAppointmentThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },

    // delete Appointment
    [deleteAppointmentThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteAppointmentThunk.fulfilled]: (state, { payload }) => {
      toast.success('Appointment Deleted.')

      state.isLoading = false
    },
    [deleteAppointmentThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
  },
})
export const { createFunction, getStateValues, next, prev, index } =
  appointmentSlice.actions
export default appointmentSlice.reducer
