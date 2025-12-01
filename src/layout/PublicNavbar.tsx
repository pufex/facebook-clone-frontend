import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";

export default function PublicNavbar(){
    const navigate = useNavigate()
    return <>
        <Navbar>
            <div 
                className="w-10 h-10 rounded-full bg-linear-60 from-sky-700 to-sky-500 text-white text-center font-bold text-2xl"
                onClick={() => navigate("/auth/login")}
            >
                F
            </div>
        </Navbar>
        <main className="w-full mx-auto max-w-6xl px-4 py-6">
            <Outlet />
        </main>
    </>
}