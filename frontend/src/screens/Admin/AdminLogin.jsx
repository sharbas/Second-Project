import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/AdminSlices/adminAuthSlice.js";
import { toast,ToastContainer } from "react-toastify";
import { useAdminLoginMutation } from "../../slices/AdminSlices/adminApiSlice.js";
import './AdminLogin.css'
import { axiosInstance } from "../../utils/adminAxiosInst.js";
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
      console.log(email,'client');
      const res = await axiosInstance.post('/auth',{email,password})
      dispatch(setCredentials({ ...res.data }));
      navigate("/admin/home");
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

export default AdminLogin;
