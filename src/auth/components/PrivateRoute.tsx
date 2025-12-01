import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate, useLocation } from "react-router";

export default function PrivateRoute() {
    const { pathname } = useLocation()
    const { auth } = useAuth()
    return auth
        ? <Outlet />
        : <Navigate
            to="/auth/login"
            replace={true}
            state={{ previous: pathname }}
        />
}