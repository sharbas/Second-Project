import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import {useHotelVerifyOtpMutation} from '../../slices/HotelSlices/hotelApiSlice.js'
import hotelAxiosInstance from "../../utils/hotelAxiosInstance.js";
import './HotelLogin.css'
function HotelVerifyOtp(){
    const [otp,setOtp]=useState('')
    const navigate=useNavigate()
    const {state}=useLocation()

    const [Otpverify]=useHotelVerifyOtpMutation()

    const verifyOtpHandler=async(e)=>{
        e.preventDefault()
        try{
            const res=await hotelAxiosInstance.post('/verifyOtp',{state,otp})
            navigate('/hotel/resetPassword',{state:state})

        }catch(error){
            toast.error(error?.data||error.error)
        }
    }

    return(


<div className='login template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: 'rgb(255 204 0)' }}>
    <div className='form_container p-5 rounded bg-white'>
      <form onSubmit={verifyOtpHandler}>
        <h3 className='text-center'>Verify Otp</h3>
        <div className='mb-3'>
          <input type="text" name="otp" placeholder='Enter Otp' className='form-control'  onChange={(e) => setOtp(e.target.value)} />
        </div>
       
        <div className='d-grid'>
          <button type="submit" className='btn btn-primary mb-3' >
          Verify OTP
          </button>
        </div>
      
      </form>
    </div>
   
  </div>
    )
}

export default HotelVerifyOtp