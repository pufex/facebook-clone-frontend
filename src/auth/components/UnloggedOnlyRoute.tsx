import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router";

export default function PrivateRoute() {
    const { auth } = useAuth()
    return !auth
        ? <Outlet />
        : <Navigate
            to="/"
            replace={true}
        />
}