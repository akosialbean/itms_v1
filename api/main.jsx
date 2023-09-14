import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import store from './store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import Home from '../pages/Home.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'
import ProfilePage from '../pages/ProfilePage.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

// PAGES
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App /> }>
      <Route index={true} path='/' element={ <Home />} />
      <Route path='/login' element={ <LoginPage />} />
      <Route path='/register' element={ <RegisterPage />} />
      {/* PRIVATE ROUTES */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={ <ProfilePage />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={ router } />
    </React.StrictMode>
  </Provider>
)
