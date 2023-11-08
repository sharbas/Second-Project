import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast,ToastContainer } from "react-toastify";
import { useRegisterMutation} from "../../slices/HotelSlices/hotelApiSlice.js";
// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { setCredentials } from "../../slices/HotelSlices/hotelAuthSlice.js";
import './HotelSignup.css'

const HotelSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { hotelInfo } = useSelector((state) => state.hotelauth);
  const [register, { isLoading }] = useRegisterMutation();
  // const [googleAuth, { authLoading }] = useGoogleAuthMutation();

  useEffect(() => {
    if (hotelInfo) {
      navigate("/hotel/home");
    }
  }, [hotelInfo]);

  // const authenticateData = async (credentialResponse) => {
  //   try {
  //     let res = await googleAuth({ credentialResponse }).unwrap();
  //     dispatch(setCredentials({ ...res }));
  //     navigate("/");
  //   } catch (error) {
  //     toast.error("User already exists");
  //   }
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/hotel/login");
      } catch (error) {
        toast.error("error 1" || err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
    <div>
          <div className='signup template d-flex justify-content-center align-items-center vh-100 ' style={{ backgroundColor: 'rgb(255 204 0)' }}>
            <div className='form_container p-5 rounded bg-white'>
              <form onSubmit={submitHandler}>
                <h3 className='text-center'>Sign Up</h3>
                <div className='mb-3'>
                  <input type="text" name="name" placeholder='Enter Name' value={name} className='form-control' onChange={(e)=>setName(e.target.value)} />
                
                </div>
                <div className='mb-3'>
                  <input type="email" name="email" value={email} placeholder='Enter Email' className='form-control' onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className='mb-3'>
                  <input type="password" name="password" value={password} placeholder='Enter password' className='form-control' onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div className='mb-3'>
                  <input type="password" name="confirmPassword" value={confirmPassword} placeholder='Confirm Password' className='form-control' onChange={(e)=>setConfirmPassword(e.target.value)} />
                </div>
                <div className='mb-2'>
                  <input type='checkbox' className='custom-control custom-checkbox' id='check' />
                  <label htmlFor='check' className='custom-input-label ms-2'>
                    Remember me
                  </label>
                </div>            <div className='d-grid mt-2'>
                  <button type="submit" className='btn bg-primary text-white mb-3'>Sign Up</button>
                </div>
                <p className='text-end mt-2'>
              <Link to='/hotel/login' className='ms-2' style={{textDecoration:'none'}}>Sign In</Link>
            </p>
              </form>
            </div>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
    </>

  );
};

export default HotelSignUp;
