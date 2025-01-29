import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken, selectCurrentUserRole } from "./authSlice"

const RequireAuth = ({ allowedRoles }) => {
    console.log("allowed roles", allowedRoles)
    const token = useSelector(selectCurrentToken);
    const role = useSelector(selectCurrentUserRole);
    console.log("user from require auth", role);
    console.log("token from require auth", token);
    const location = useLocation()

    return (
        token && allowedRoles.includes(role)
            ? <Outlet />
            : token ? <Navigate to="/unauthorized" state={{ from: location }} /> : <Navigate to="/login" state={{ from: location }} />
    )
}
export default RequireAuth
