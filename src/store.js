import { configureStore } from '@reduxjs/toolkit'
import aboutUsSlice from './features/aboutUs/aboutUsSlice'
import contactSlice from './features/contact/contactSlice'
import functionSlice from './features/functions/functionSlice'
import orderSlice from './features/order/orderSlice'
import editProductSlice from './features/products/editProductSlice'
import productSlice from './features/products/productSlice'
import userSlice from './features/user/userSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    editProduct: editProductSlice,
    function: functionSlice,
    contact: contactSlice,
    order: orderSlice,
    aboutUs: aboutUsSlice,
  },
})

export default store
