import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import hotelAxiosInstance from "../../utils/hotelAxiosInstance.js";
import './HotelLogin.css'


function HotelForgotPassword(){
    console.log('hai HotelForgotPassword');
    const [email,setEmail]=useState('')

    
   
    const navigate=useNavigate()
    
    const forgotSubmitHandler=async(e)=>{
        e.preventDefault()

        try{
            const res=await hotelAxiosInstance.put('/forgotPassword',{email})
            console.log('this is hotel forgot password dsf');
console.log(res);
navigate('/hotel/verifyOtp',{state:email})
        }catch(error){
            toast.error(error?.data||error.error)
        }
    }

    return (


<div className='login template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: 'rgb(255 204 0)' }}>
<div className='form_container p-5 rounded bg-white'>
  <form onSubmit={forgotSubmitHandler}>
    <h3 className='text-center'>Forgot Password</h3>
    <div className='mb-3'>
      <input type="email" name="email" placeholder='Enter Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
   
    <div className='d-grid'>
      <button type="submit" className='btn btn-primary mb-3' >
       Sent Otp
      </button>
    </div>
   
  </form>
</div>

</div>

    )

}

export default HotelForgotPassword