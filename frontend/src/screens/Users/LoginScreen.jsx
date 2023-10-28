import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice.js";
import { toast,ToastContainer } from "react-toastify";
import {useLoginMutation} from "../../slices/usersApiSlice.js";
import './LoginScreen.css'

// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();
  // , { isLoading }
  // const [googleLogin] = useGoogleLoginMutation();
// , { loginLoading }

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  // const authenticateData = async (credentialRespose) => {
  //   try {
  //     let res = await googleLogin({ credentialRespose }).unwrap();
  //     dispatch(setCredentials({ ...res }));
  //     navigate("/");
  //   } catch (error) {}
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      
      dispatch(setCredentials({ ...res }));
      navigate("/");
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
        <div className='d-flex justify-content-between mb-3'>
          <p className='mt-2'>
            <a href='/register' style={{textDecoration:'none'}}>Register</a>
          </p>
          <p className='mt-2'>
            Forgot <a href='/forgotPassword' style={{textDecoration:'none'}}>Password?</a>
          </p>
        </div>
      </form>
    </div>
  </div>
  


  
  );
};
export default LoginScreen;
