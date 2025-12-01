import { createContext, useState, type JSX, useCallback } from "react";
import type { RegisterObject, User } from "../types";
import { axiosPublic } from "../api/api";

type AuthObject = {
    user: User,
    accessToken: string
}

type AuthContextType = {
    auth: AuthObject | null,
    register: (data: RegisterObject) => Promise<void>
} | null

type AuthProviderProps = {
    children: JSX.Element
}

export const AuthContext = createContext<AuthContextType>(null)

export default function AuthProvider({ children }: AuthProviderProps) {

    const [auth, setAuth] = useState(null)

    const register = useCallback(async (data: RegisterObject) => {
        try {
            await axiosPublic.post(
                "/auth/register",
                data,
                { headers: { "Content-Type": "application/json" } }
            )
        } catch (err) {
            throw err
        }
    }, [])

    return <AuthContext.Provider value={{ auth, register }}>
        {children}
    </AuthContext.Provider>
}