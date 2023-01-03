import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import {
  getItemFromLocalStorage,
  getUserFromLocalStorage,
  removeImageFromLocalStorage,
  setItemInLocalStorage,
} from '../../utils/localStorage'
import paginate from '../../utils/paginate'
const user = getUserFromLocalStorage()
const localUploadImage = getItemFromLocalStorage('aboutUsImage')

const initialState = {
  name: '',
  profession: '',
  paragraph: '',
  uploadImage: localUploadImage || [],
  aboutUssList: [],
  nbHits: '',
  aboutUsDeleteId: '',
  getAboutUss: false,
  isLoading: false,
}

export const aboutUsThunk = createAsyncThunk(
  'aboutUs/aboutUsThunk',
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
  'aboutUs/uploadImageThunk',
  async (file, thunkAPI) => {
    try {
      const response = await customFetch.post(
        '/contentAboutUs/uploadImage',
        file,
        {
          headers: {
            'content-type': 'multipart/form-data',
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
// ========== Delete Image =======
export const deleteImageThunk = createAsyncThunk(
  'aboutUs/deleteImageThunk',
  async (public_id, thunkAPI) => {
    const data = { public_id: public_id }
    try {
      await customFetch.post('/contentAboutUs/deleteImage', data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      return public_id
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ========== Upload AboutUs =======
export const uploadAboutUsThunk = createAsyncThunk(
  'aboutUs/uploadAboutUsThunk',
  async (aboutUs, thunkAPI) => {
    try {
      const response = await customFetch.post(
        '/aboutUss/uploadAboutUs',
        aboutUs,
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
// ========= Get aboutUss ========
export const getAboutUssThunk = createAsyncThunk(
  'aboutUs/getAboutUssThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/aboutUss/static')

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ========= Delete aboutUss ========
export const deleteAboutUssThunk = createAsyncThunk(
  'aboutUs/deleteAboutUssThunk',
  async (_id, thunkAPI) => {
    try {
      const response = await customFetch.delete(
        `/aboutUss/singleAboutUs/${_id}`,
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

const aboutUsSlice = createSlice({
  name: 'aboutUs',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    getUploadAboutUsAmount: (state, { payload }) => {
      state.amount = payload
    },
    getAboutUsDeleteId: (state, { payload }) => {
      state.aboutUsDeleteId = payload
    },
    getStateValues: (state, { payload }) => {
      const { name, value } = payload
      state[name] = value
    },
  },
  extraReducers: {
    [aboutUsThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
      state.isLoading = true
    },
    [aboutUsThunk.fulfilled]: (state, { payload }) => {
      console.log('promise full filled')
      state.isLoading = false
    },
    [aboutUsThunk.rejected]: (state, { payload }) => {
      console.log('promise rejected')
      state.isLoading = false
    },
    // ====== Upload Image ======
    [uploadImageThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [uploadImageThunk.fulfilled]: (state, { payload }) => {
      state.uploadImage = [...state.uploadImage, payload]
      const uploadImage = state.uploadImage
      const name = 'aboutUsImage'
      setItemInLocalStorage(name, uploadImage)
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
      const name = 'aboutUsImage'
      setItemInLocalStorage(name, state.uploadImage)
      state.isLoading = false
    },
    [deleteImageThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // ====== upload AboutUs ======
    [uploadAboutUsThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [uploadAboutUsThunk.fulfilled]: (state, { payload }) => {
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
      toast.success('AboutUs is uploaded.')
      state.isLoading = false
    },
    [uploadAboutUsThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // ====== Get AboutUss ======
    [getAboutUssThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getAboutUssThunk.fulfilled]: (state, { payload }) => {
      const { nbHits, aboutUss } = payload
      state.aboutUssList = paginate(aboutUss)
      state.nbHits = nbHits
      state.isLoading = false
    },
    [getAboutUssThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // ====== Delete AboutUss ======
    [deleteAboutUssThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteAboutUssThunk.fulfilled]: (state, { payload }) => {
      state.getAboutUss = !state.getAboutUss
      toast.success('aboutUs is deleted.')
      state.isLoading = false
    },
    [deleteAboutUssThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
  },
})
export const {
  createFunction,
  getStateValues,
  getAboutUsDeleteId,
  getUploadAboutUsAmount,
} = aboutUsSlice.actions
export default aboutUsSlice.reducer
