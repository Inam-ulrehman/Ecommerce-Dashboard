import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ChangePassword, Profile } from './components/dashboard'
import ScrollToTopHook from './hooks/ScrollToTopHook'
import {
  SharedLayout,
  ErrorPage,
  Contact,
  Products,
  Dashboard,
  ProtectedRoute,
  SharedDashboardLayout,
  Register,
  UploadProduct,
} from './pages'
import SingleProduct from './pages/SingleProduct'

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTopHook />
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Register />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <SharedDashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* ===============Dashboard inside route=============== */}
            <Route path='/dashboard' element={<Dashboard />}>
              <Route path='/dashboard/contact' element={<Contact />} />
              <Route path='/dashboard/products' element={<Products />} />
              <Route
                path='/dashboard/products/:_id'
                element={<SingleProduct />}
              />
            </Route>
            {/* ===============Dashboard inside route=============== */}
            <Route path='/dashboard/profile' element={<Profile />} />
            <Route path='/dashboard/upload' element={<UploadProduct />} />
            <Route
              path='/dashboard/changePassword'
              element={<ChangePassword />}
            />
          </Route>

          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
