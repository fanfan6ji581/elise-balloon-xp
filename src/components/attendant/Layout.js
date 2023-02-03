import { Navigate, useParams, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginAttendant } from "../../slices/attendantSlice";

const Layout = () => {
    const { alias } = useParams();
    const location = useLocation();
    const loginAttendantS = useSelector(loginAttendant);

    if (!loginAttendantS && !location.pathname.includes(`login`)) {
        return <Navigate to={`/xp/${alias || '1st-xp'}/login`} />;
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default Layout
