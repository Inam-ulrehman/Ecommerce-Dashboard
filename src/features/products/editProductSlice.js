import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'
const user = getUserFromLocalStorage()

let initialState = {
  _id: '',
  title: '',
  amount: '',
  category: '',
  subCategory: '',
  inStock: true,
  totalStock: 10,
  value: [],
  uploadImage: [],
  description: '',
  product: [],
  nbHits: '',
  isLoading: false,
}
// Single product
export const singleProductThunk = createAsyncThunk(
  'product/singleProductThunk',
  async (_id, thunkAPI) => {
    try {
      const response = await customFetch.get(`/products/singleProduct/${_id}`)

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// edit Product
export const editProductThunk = createAsyncThunk(
  'product/editProductThunk',
  async (product, thunkAPI) => {
    try {
      const response = await customFetch.patch(
        `/products/singleProduct/${product._id}`,
        product,
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

const editProductSlice = createSlice({
  name: 'editProduct',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    editLocalImage: (state, { payload }) => {
      state.uploadImage = payload
    },
    getEditProductValue: (state, { payload }) => {
      const { name, value } = payload
      state[name] = value
    },
  },
  extraReducers: {
    // ========== Get Single product
    [singleProductThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [singleProductThunk.fulfilled]: (state, { payload }) => {
      state._id = payload._id
      state.title = payload.title
      state.amount = payload.amount
      state.category = payload.category
      state.subCategory = payload.subCategory
      state.inStock = payload.inStock
      state.totalStock = payload.totalStock
      state.uploadImage = payload.uploadImage
      state.description = payload.description

      state.isLoading = false
    },
    [singleProductThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // ========== Edit Single product
    [editProductThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [editProductThunk.fulfilled]: (state, { payload }) => {
      toast.success('product is updated.')
      state.isLoading = false
    },
    [editProductThunk.rejected]: (state, { payload }) => {
      console.log('promise rejected')
      state.isLoading = false
    },
  },
})
export const { createFunction, getEditProductValue, editLocalImage } =
  editProductSlice.actions
export default editProductSlice.reducer
