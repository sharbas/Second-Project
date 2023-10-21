import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

const AdminPrivateRoute = () => {
  const { adminInfo } = useSelector((state) => state.adminauth);
  return adminInfo ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminPrivateRoute;
