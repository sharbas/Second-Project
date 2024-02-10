import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {useLoginMutation,} from "../../slices/HotelSlices/hotelApiSlice.js";
import hotelAxiosInstance from "../../utils/hotelAxiosInstance.js";
import { setCredentials } from "../../slices/HotelSlices/hotelAuthSlice.js";
import { toast,ToastContainer } from "react-toastify";
import './HotelLogin.css'
import axios from "axios";
// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const HotelLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  // , { isLoading }

  // const [googleLogin, { loginLoading }] = useGoogleLoginMutation();
  const { hotelInfo } = useSelector((state) => state.hotelauth);

  useEffect(() => {
    if (hotelInfo) {
      navigate("/hotel/home");
    }
  }, [navigate, hotelInfo]);

 

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://travelwithwetravel.website/api/hotel/auth',{email, password})
      dispatch(setCredentials({ ...res.data }));
      navigate("/hotel/home");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: 'rgb(225 210 0)' }}>
    <div className='form_container p-5 rounded bg-white'>
      <form onSubmit={submitHandler}>
        <h3 className='text-center'>Sign In</h3>
        <div className='mb-3'>
        <input
  type="email"
  name="email"
  placeholder="Enter Email"
  className="form-control"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  autoComplete="username" // Add this line
/>

        </div>
        <div className='mb-3'>
          <input type="password" name="password" placeholder='Enter password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)}  autoComplete="current-password"/>
        </div>
        <div className='d-grid'>
          <button type="submit" className='btn bg-primary text-white mb-3' >
            Sign In
          </button>
        </div>
        <div className='d-flex justify-content-between mb-3'>
          <p className='mt-2'>
            <a href='/hotel/register' style={{textDecoration:'none'}}>Register</a>
          </p>
          <p className='mt-2'>
            Forgot <a href='/hotel/forgotPassword' style={{textDecoration:'none'}}>Password?</a>
          </p>
        </div>
      </form>
    </div>
    <ToastContainer/>
  </div>
  );
};

export default HotelLogin;
