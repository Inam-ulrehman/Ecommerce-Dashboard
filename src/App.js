import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ChangePassword, Profile } from './components/dashboard'
import ScrollToTopHook from './hooks/ScrollToTopHook'
import {
  SharedLayout,
  LandingPage,
  ErrorPage,
  About,
  Contact,
  Products,
  Dashboard,
  ProtectedRoute,
  SingleChangePassword,
  VerifyUser,
  SharedDashboardLayout,
  Register,
} from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTopHook />
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<LandingPage />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <SharedDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />}></Route>
            <Route path='/dashboard/profile' element={<Profile />} />
            <Route
              path='/dashboard/changepassword'
              element={<ChangePassword />}
            />
          </Route>
          <Route path='changepassword/:id' element={<SingleChangePassword />} />
          <Route path='verify/:id' element={<VerifyUser />} />
          <Route path='about' element={<About />} />
          <Route path='products' element={<Products />} />
          <Route path='contact' element={<Contact />} />
          <Route path='register' element={<Register />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
