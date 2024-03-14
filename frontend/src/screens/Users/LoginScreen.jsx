import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice.js";
import { toast } from "react-toastify";
import {useLoginMutation,useGoogelLoginMutation} from "../../slices/usersApiSlice.js";
import './LoginScreen.css'
// import {GoogleLogin} from 'react-google-login'
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation()
  const [googleLogin,{loginLoading}]=useGoogelLoginMutation()

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const authenticateData = async (credentialResponse) => {
    try {
      console.log('Attempting to authenticate data with Google');
      
      // Log the received credentialResponse
      console.log('Received credentialResponse:', credentialResponse);

      // Call the googleLogin mutation
      let res = await googleLogin({ credentialResponse }).unwrap();

      // Log the response from the server
      console.log('Authentication successful. Response from server:', res);

      // Dispatch the action to set credentials
      dispatch(setCredentials({ ...res }));

      // Navigate to the desired location
      navigate("/");
    } catch (error) {
      // Log any errors during the authentication process
      console.error('Error during authentication:', error);

      // Display a toast message for the user
      toast.error("This user is either invalid or blocked by admin.");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success(res.message)
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (

    // <GoogleOAuthProvider clientId='704159527663-8d2ikv5bla9pcqd8mdst9og6c2162n2c.apps.googleusercontent.com'>

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
          <button type="submit" className='btn bg-primary text-white mb-3' >
            Sign In
          </button>
        </div>
        <div className='d-flex justify-content-between mb-3 sm:flex'>
          <p className='mt-2'>
            <a href='/register' style={{textDecoration:'none'}}>Register</a>
          </p>
          <p className='mt-2'>
            Forgot <a href='/forgotPassword' style={{textDecoration:'none'}}>Password?</a>
          </p>
        </div>
        {/* <GoogleLogin
              onSuccess={credentialResponse => {
                authenticateData(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            /> */}
      </form>
    </div>
  </div>
  
  // </GoogleOAuthProvider>

  
  );
};
export default LoginScreen;
