import { Outlet } from "react-router";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";

export default function PublicNavbar(){
    return <>
        <Navbar>
            <Logo />
        </Navbar>
        <main className="w-full mx-auto max-w-6xl px-4 py-6">
            <Outlet />
        </main>
    </>
}