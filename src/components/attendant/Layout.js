import { Navigate, useParams, useLocation, Outlet } from "react-router-dom";
import AttendentAppBar from "./AttendentAppBar";
import { useSelector } from "react-redux";
import { loginAttendant } from "../../slices/attendantSlice";

const Layout = () => {
    const { alias } = useParams();
    const location = useLocation();
    const loginAttdentS = useSelector(loginAttendant);

    if (!loginAttdentS && !location.pathname.includes(`login`)) {
        return <Navigate to={`/xp/${alias || '1st-xp'}/login`} />;
    }

    return (
        <>
            <AttendentAppBar />
            <Outlet />
        </>
    )
}

export default Layout
