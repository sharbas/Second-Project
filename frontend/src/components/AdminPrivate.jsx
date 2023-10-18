import { Navigate,Outlet } from "react-router-dom";

import { useSelector } from "react-redux";


const adminPrivateRoute=()=>{
    const {adminInfo}=useSelector((state)=>state.adminauth)
    return adminInfo?<Outlet/>:<Navigate to='/admin/login' replace/>
}

export default adminPrivateRoute




