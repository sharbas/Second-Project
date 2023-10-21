import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {useLoginMutation,} from "../../slices/HotelSlices/hotelApiSlice.js";
import { setCredentials } from "../../slices/authSlice.js";
import { toast,ToastContainer } from "react-toastify";
import './HotelLogin.css'
// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const HotelLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Login] = useLoginMutation();
  // , { isLoading }

  // const [googleLogin, { loginLoading }] = useGoogleLoginMutation();
  const { hotelInfo } = useSelector((state) => state.hotelauth);

  useEffect(() => {
    if (hotelInfo) {
      navigate("/hotel/home");
    }
  }, [navigate, hotelInfo]);

  // const authenticateData = async (credentialRespose) => {
  //   try {
  //     let res = await googleLogin({ credentialRespose }).unwrap();
  //     dispatch(setCredentials({ ...res }));
  //     navigate("/hotel/home");
  //   } catch (error) {}
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await Login({ email, password }).wrap();
      dispatch(setCredentials({ ...res }));
      navigate("/hotel/home");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#EFD3B5' }}>
    <div className='form_container p-5 rounded bg-white'>
      <form onSubmit={submitHandler}>
        <h3 className='text-center'>Sign In</h3>
        <div className='mb-3'>
          <input type="email" name="email" placeholder='Enter Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='mb-3'>
          <input type="password" name="password" placeholder='Enter password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='d-grid'>
          <button type="submit" className='btn btn-primary mb-3' >
            Sign In
          </button>
        </div>
        <p className='text-end mt-2'>
          Forgot <a href=''>Password?</a>
        </p>
      </form>
    </div>
    <ToastContainer/>
  </div>
  );
};

export default HotelLogin;
