import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AdminAppBar from './AdminAppBar';
import { loginUser } from "../../slices/adminSlice";

const Layout = () => {
  const location = useLocation();
  const loginUserS = useSelector(loginUser);

  if (!loginUserS && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" />;
  }
  if (loginUserS && location.pathname === '/admin') {
    return <Navigate to="/admin/dashboard" />;
  }
  return (
    <>
      <AdminAppBar />
      <Outlet />
    </>
  )
}

export default Layout
