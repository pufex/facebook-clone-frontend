import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import UserBubble from "../auth/components/UserBubble";
import Logo from "../components/Logo";

export default function PrivateNavbar(){
    return <>
        <Navbar>
            <Logo />
            <UserBubble />
        </Navbar>
        <main className="w-full mx-auto max-w-6xl px-4 py-6">
            <Outlet />
        </main>
    </>
}