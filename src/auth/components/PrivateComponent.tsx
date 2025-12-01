import type { JSX } from "react";
import { useAuth } from "../hooks/useAuth";

type PrivateComponentProps = {
    children: JSX.Element
}

export default function PrivateComponent({children}: PrivateComponentProps){
    const {auth} = useAuth()
    return auth
        ? children
        : null
}