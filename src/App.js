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
} from './pages'

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
            <Route index element={<Dashboard />} />
            <Route path='/dashboard/profile' element={<Profile />} />
            <Route
              path='/dashboard/changepassword'
              element={<ChangePassword />}
            />
            <Route path='/dashboard/products' element={<Products />} />
            <Route path='/dashboard/contact' element={<Contact />} />
          </Route>

          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
