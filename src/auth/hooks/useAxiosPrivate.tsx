import { axiosPrivate } from "../../api/api";
import { useEffect } from "react";
import { useAuth } from "./useAuth";

export const useAxiosPrivate = () => {
    const {auth, refresh} = useAuth()

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers.authorization){
                    config.headers.authorization = `Bearer ${auth?.accessToken}`
                }
                return config
            },
            err => err
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            config => config,
            async(err) => {
                const prevRequest = err.config
                if(!prevRequest.sent && err.response.status === 403){
                    prevRequest.sent = true
                    const responseAuthObject = await refresh()
                    if(responseAuthObject){
                        prevRequest.headers.authorization = `Bearer ${responseAuthObject.accessToken}`
                    }
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(err)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }
    }, [])

    return axiosPrivate
}