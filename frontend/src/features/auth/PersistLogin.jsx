import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import refreshTokenQuery from "./refreshToken";
// import { setCredentials } from "../auth/authSlice";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    // const [refresh, { isLoading: isRefreshing }] = useRefreshMutation();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            // console.log("Inside function");
            try {
                const api = {
                    dispatch,
                    getState: () => ({ auth: { token, user: null } }), // Provide a mock `getState` function
                };
                // Use the standalone refresh token query
                const response = await refreshTokenQuery(api);
                // console.log("Response from refresh endpoint1", response);
            } catch (err) {
                console.error("Refresh token failed", err);
            } finally {
                setIsLoading(false);
            }
        };
        if (!token) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }
    }, [token, dispatch]);

    if (isLoading) return <p>Loading...</p>;

    return <Outlet />;
};

export default PersistLogin;
