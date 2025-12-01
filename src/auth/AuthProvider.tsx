import { createContext, useState, type JSX, useCallback, useRef, useEffect } from "react";
import type { ImageChunk, ImageDeclaration, LoginObject, RegisterObject, ResponseUser, User } from "../types";
import { axiosPublic } from "../api/api";

type AuthObject = {
    user: User,
    accessToken: string
}

type AuthState = AuthObject | null

type ResponseAuthObject = {
    user: ResponseUser,
    accessToken: string,
}

type AuthContextType = {
    auth: AuthState,
    register: (data: RegisterObject) => Promise<void>,
    login: (data: LoginObject) => Promise<void>,
    logout: () => Promise<void>
} | null

type AuthProviderProps = {
    children: JSX.Element
}

export const AuthContext = createContext<AuthContextType>(null)

export default function AuthProvider({ children }: AuthProviderProps) {

    const [auth, setAuth] = useState<AuthState>(null)
    const profile_pic_id = useRef<string>(null)
    const background_pic_id = useRef<string>(null)

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

    const login = useCallback(async (data: LoginObject) => {
        try {
            const response = await axiosPublic.post(
                "/auth/register",
                data,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" }
                }
            )
            const authResponseObject = response.data as ResponseAuthObject
            profile_pic_id.current = authResponseObject.user.profile_picture_id
            background_pic_id.current = authResponseObject.user.background_picture_id
            setAuth({
                ...authResponseObject,
                user: {
                    ...authResponseObject.user,
                    profile_picture: authResponseObject.user.profile_picture_id
                        ? {
                            id: authResponseObject.user.profile_picture_id,
                            loading: true,
                            error: "",
                            data: "",
                        }
                        : null,
                    background_picture: authResponseObject.user.background_picture_id
                        ? {
                            id: authResponseObject.user.background_picture_id,
                            loading: true,
                            error: "",
                            data: "",
                        }
                        : null
                }
            })
        } catch (err) {
            throw err
        }
    }, [])

    const logout = useCallback(async () => {
        try{
            await axiosPublic.get("/auth/logout")
            profile_pic_id.current = null
            background_pic_id.current = null
            setAuth(null)
        }catch(err){
            console.log(err)
        }
    }, [])

    useEffect(() => {
        const fetchProfilePicture = async () => {
            if (profile_pic_id.current && auth && auth.user.profile_picture && auth.user.profile_picture.id !== profile_pic_id.current) {
                try {
                    const declaration_id = auth.user.profile_picture.id
                    profile_pic_id.current = declaration_id
                    const declarationResponse = await axiosPublic.get(`/images/declaration/${declaration_id}`)
                    const declaration = declarationResponse.data as ImageDeclaration
                    setAuth(prev => !prev
                        ? prev
                        : {
                            ...prev,
                            user: {
                                ...prev.user,
                                profile_picture: {
                                    id: declaration_id,
                                    loading: true,
                                    error: "",
                                    data: ""
                                }
                            }
                        }
                    )
                    const chunksNumbers = []
                    for (let i = 0; i < declaration.chunksAmount; i++) {
                        chunksNumbers.push(i + 1)
                    }
                    const listedChunks: Pick<ImageChunk, "chunkNumber" | "data">[] = await Promise.all(chunksNumbers.map(async (chunkNumber) => {
                        const chunkResponse = await axiosPublic.post(`/images/chunk/${declaration_id}`, { chunkNumber })
                        const chunk = chunkResponse.data as ImageChunk
                        return { chunkNumber, data: chunk.data }
                    }))
                    setAuth(prev => !prev
                        ? prev
                        : {
                            ...prev,
                            user: {
                                ...prev.user,
                                profile_picture: prev.user.profile_picture
                                    ? {
                                        ...prev.user.profile_picture,
                                        loading: false,
                                        data: listedChunks
                                            .sort((a, b) => a.chunkNumber - b.chunkNumber)
                                            .map(chunk => chunk.data)
                                            .join("")
                                    }
                                    : prev.user.profile_picture,
                            }
                        }
                    )
                } catch (err) {
                    console.log(err)
                    setAuth(prev => !prev
                        ? prev
                        : {
                            ...prev,
                            user: {
                                ...prev.user,
                                profile_picture: {
                                    id: "",
                                    loading: false,
                                    error: "Failed to fetch",
                                    data: ""
                                }
                            }
                        }
                    )
                }
            }
        }

        const fetchBackgroundPicture = async () => {
            if (background_pic_id.current && auth && auth.user.background_picture && auth.user.background_picture.id !== background_pic_id.current) {
                try {
                    const declaration_id = auth.user.background_picture.id
                    profile_pic_id.current = declaration_id
                    const declarationResponse = await axiosPublic.get(`/images/declaration/${declaration_id}`)
                    const declaration = declarationResponse.data as ImageDeclaration
                    setAuth(prev => !prev
                        ? prev
                        : {
                            ...prev,
                            user: {
                                ...prev.user,
                                background_picture: {
                                    id: declaration_id,
                                    loading: true,
                                    error: "",
                                    data: ""
                                }
                            }
                        }
                    )
                    const chunksNumbers = []
                    for (let i = 0; i < declaration.chunksAmount; i++) {
                        chunksNumbers.push(i + 1)
                    }
                    const listedChunks: Pick<ImageChunk, "chunkNumber" | "data">[] = await Promise.all(chunksNumbers.map(async (chunkNumber) => {
                        const chunkResponse = await axiosPublic.post(`/images/chunk/${declaration_id}`, { chunkNumber })
                        const chunk = chunkResponse.data as ImageChunk
                        return { chunkNumber, data: chunk.data }
                    }))
                    setAuth(prev => !prev
                        ? prev
                        : {
                            ...prev,
                            user: {
                                ...prev.user,
                                background_picture: prev.user.background_picture
                                    ? {
                                        ...prev.user.background_picture,
                                        loading: false,
                                        data: listedChunks
                                            .sort((a, b) => a.chunkNumber - b.chunkNumber)
                                            .map(chunk => chunk.data)
                                            .join("")
                                    }
                                    : prev.user.background_picture,
                            }
                        }
                    )
                } catch (err) {
                    console.log(err)
                    setAuth(prev => !prev
                        ? prev
                        : {
                            ...prev,
                            user: {
                                ...prev.user,
                                background_picture: {
                                    id: "",
                                    loading: false,
                                    error: "Failed to fetch",
                                    data: ""
                                }
                            }
                        }
                    )
                }
            }
        }

        fetchProfilePicture();
        fetchBackgroundPicture();
    }, [auth])

    return <AuthContext.Provider value={{ auth, register, login, logout }}>
        {children}
    </AuthContext.Provider>
}