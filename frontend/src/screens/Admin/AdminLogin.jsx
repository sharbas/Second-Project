import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/AdminSlices/adminAuthSlice.js";
import { toast} from "react-toastify";
import { useAdminLoginMutation } from "../../slices/AdminSlices/adminApiSlice.js";
import './AdminLogin.css'
import  adminAxiosInstance  from "../../utils/adminAxiosInstance.js";
import axios from "axios";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adminLogin,{isLoading}] = useAdminLoginMutation();

  const { adminInfo } = useSelector((state) => state.adminauth);

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin/home");
    }
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {  
      
   
        const res = await axios.post('https://www.wetravels.online/api/admin/auth', { email, password });
        dispatch(setCredentials({ ...res.data }));
        navigate("/admin/home");
        toast.success(res.data.message);
    } catch (error) {
        toast.error(error.response?.data.message || error.message); // Access 'data.message' property
    }
};

  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: 'rgb(11 142 140)' }}>
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
      
      </form>
    </div>

  </div>
  );
};

export default AdminLogin;
