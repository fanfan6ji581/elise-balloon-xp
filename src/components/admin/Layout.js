import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AdminAppBar from './AdminAppBar';
import { loginAdmin } from "../../slices/adminSlice";

const Layout = () => {
  const location = useLocation();
  const loginAdminS = useSelector(loginAdmin);

  if (!loginAdminS && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" />;
  }
  if (loginAdminS && location.pathname === '/admin') {
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
