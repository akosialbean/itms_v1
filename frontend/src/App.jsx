
import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className='mt-5 pt-5'>
        <Outlet />
      </Container>
    </>
  )
}

export default App