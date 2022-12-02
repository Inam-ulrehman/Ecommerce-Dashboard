import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import {
  getImageFromLocalStorage,
  getUserFromLocalStorage,
  removeImageFromLocalStorage,
  setImageInLocalStorage,
} from '../../utils/localStorage'
import paginate from '../../utils/paginate'
const { token } = getUserFromLocalStorage('user')
const localUploadImage = getImageFromLocalStorage('uploadImage')

const initialState = {
  title: '',
  amount: '',
  category: '',
  subCategory: '',
  inStock: true,
  totalStock: 10,
  value: [],
  uploadImage: localUploadImage || [],
  description: '',
  productsList: [],
  nbHits: '',
  isLoading: false,
}

export const productThunk = createAsyncThunk(
  'product/productThunk',
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
// ========== Upload image =======
export const uploadImageThunk = createAsyncThunk(
  'product/uploadImageThunk',
  async (file, thunkAPI) => {
    try {
      const response = await customFetch.post('/products/uploadImage', file, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ========== Delete Image =======
export const deleteImageThunk = createAsyncThunk(
  'product/deleteImageThunk',
  async (public_id, thunkAPI) => {
    const data = { public_id: public_id }
    try {
      await customFetch.post('/products/deleteImage', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return public_id
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ========== Upload Product =======
export const uploadProductThunk = createAsyncThunk(
  'product/uploadProductThunk',
  async (product, thunkAPI) => {
    try {
      const response = await customFetch.post(
        '/products/uploadProduct',
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ========= Get products ========
export const getProductsThunk = createAsyncThunk(
  'product/getProductsThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/products/static')

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ========= Delete products ========
export const deleteProductsThunk = createAsyncThunk(
  'product/deleteProductsThunk',
  async (_id, thunkAPI) => {
    try {
      const response = await customFetch.delete(
        `/products/singleProduct/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    updateProductList: (state, { payload }) => {
      state.productsList = payload
    },
    getStateValues: (state, { payload }) => {
      const { name, value } = payload
      state[name] = value
    },
  },
  extraReducers: {
    [productThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
      state.isLoading = true
    },
    [productThunk.fulfilled]: (state, { payload }) => {
      console.log('promise full filled')
      state.isLoading = false
    },
    [productThunk.rejected]: (state, { payload }) => {
      console.log('promise rejected')
      state.isLoading = false
    },
    // ====== Upload Image ======
    [uploadImageThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [uploadImageThunk.fulfilled]: (state, { payload }) => {
      state.uploadImage = [...state.uploadImage, payload]
      setImageInLocalStorage(state.uploadImage)
      state.isLoading = false
    },
    [uploadImageThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // ====== Delete Image ======
    [deleteImageThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteImageThunk.fulfilled]: (state, { payload }) => {
      const newData = state.uploadImage.filter(
        (item) => item.public_id !== payload
      )
      state.uploadImage = newData
      setImageInLocalStorage(state.uploadImage)
      state.isLoading = false
    },
    [deleteImageThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // ====== upload Product ======
    [uploadProductThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [uploadProductThunk.fulfilled]: (state, { payload }) => {
      removeImageFromLocalStorage('uploadImage')
      state.title = ''
      state.amount = ''
      state.category = ''
      state.subCategory = ''
      state.description = ''
      state.uploadImage = []
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      toast.success('Product is uploaded.')
      state.isLoading = false
    },
    [uploadProductThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // ====== Get Products ======
    [getProductsThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getProductsThunk.fulfilled]: (state, { payload }) => {
      const { nbHits, products } = payload
      state.productsList = paginate(products)
      state.nbHits = nbHits
      state.isLoading = false
    },
    [getProductsThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // ====== Delete Products ======
    [deleteProductsThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteProductsThunk.fulfilled]: (state, { payload }) => {
      toast.success('product is deleted.')
      state.isLoading = false
    },
    [deleteProductsThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
  },
})
export const { createFunction, getStateValues, updateProductList } =
  productSlice.actions
export default productSlice.reducer
