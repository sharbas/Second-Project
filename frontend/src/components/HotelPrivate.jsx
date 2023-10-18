import { Navigate ,Outlet} from "react-router-dom";

import { useSelector } from "react-redux";

const hotelPrivateRoute=()=>{
    const {hotelInfo}=useSelector((state)=>state.hotelauth)
    return hotelInfo?<Outlet/>:<Navigate to='/hotel/login' replace/>
}

export default hotelPrivateRoute