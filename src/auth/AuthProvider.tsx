import { createContext, useState, type JSX } from "react";
import type { User } from "../types";

type AuthObject = {
    user: User,
    accessToken: string
}

type AuthContextType = {
    auth: AuthObject | null,
} | null

type AuthProviderProps = {
    children: JSX.Element
}

export const AuthContext = createContext<AuthContextType>(null)

export default function AuthProvider ({children}: AuthProviderProps){

    const [auth, setAuth] = useState(null)

    return <AuthContext.Provider value={{auth}}>
        {children}
    </AuthContext.Provider>
}