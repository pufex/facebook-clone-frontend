import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw Error("useAuth() used outside its provider.")
    }
    return context
}