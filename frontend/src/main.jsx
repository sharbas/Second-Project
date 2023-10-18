import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import store from './store'
import{Provider} from 'react-redux'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import HomeScreen from './screens/Users/HomeScreen.jsx';
import LoginScreen from './screens/Users/LoginScreen.jsx';
import RegisterScreen from './screens/Users/RegisterScreen.jsx';
import ProfileScreen from './screens/Users/ProfileScreen.jsx'
import PrivateRoute from './components/privateRoute.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route  path='/login' element={<LoginScreen/>}/>
      <Route  path='/register' element={<RegisterScreen/>}/>
      <Route path='' element={<PrivateRoute/>}>
      <Route  path='/profile' element={<ProfileScreen/>}/>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
  <React.StrictMode>
 <RouterProvider router={router}/>
  </React.StrictMode>,
  </Provider>
)
