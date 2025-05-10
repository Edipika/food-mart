import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken, selectCurrentUserRole } from "./authSlice"

const RequireAuth = ({ allowedRoles }) => {
    console.log("allowed roles", allowedRoles)
    const token = useSelector(selectCurrentToken);
    const role = useSelector(selectCurrentUserRole);
    console.log("user role from require auth", role);
    console.log("token from require auth", token);
    const location = useLocation()

    return (
        token && allowedRoles.includes(role)
            ? <Outlet />
           : <Navigate to="/login" state={{ from: location }} />
    )
}
export default RequireAuth
