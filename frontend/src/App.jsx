
import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TestHeader from './Test/components/TestHeader'
import TestLoginPage from './Test/pages/TestLoginPage'
import TestRegisterPage from './Test/pages/TestRegisterPage'



const App = () => {
  return (
    <>
      {/* <Header />
      <Container className='mt-5 pt-5'>
        <Outlet />
      </Container> */}
      <ToastContainer />
      <TestHeader/>
      <TestLoginPage/>
      <TestRegisterPage/>
    </>
  )
}

export default App