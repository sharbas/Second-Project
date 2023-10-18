import {useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import  {useGoogleLoginMutation, useLoginMutation} from '../../slices/HotelSlices/hotelApiSlice.js'
import { setCredentials } from '../../slices/authSlice.js'
import {toast} from 'react-toastify'
import { GoogleLogin,GoogleOAuthProvider } from '@react-oauth/google'

const hotelLoginScreen=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [LoginScreen,{isLoading}]=useLoginMutation()
    

const [googleLogin,{loginLoading}]=useGoogleLoginMutation()
const {hotelInfo}=useSelector((state)=>state.hotelauth)


}