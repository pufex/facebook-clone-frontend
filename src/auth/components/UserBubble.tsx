import { LoaderCircle, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

export default function UserBubble(){
    const navigate = useNavigate()
    const {auth} = useAuth()
    return auth && <div 
        className="w-10 h-10 border-4 border-sky-800 rounded-full flex items-center justify-center overflow-hidden"
        onClick={() => navigate(`/profile/${auth.user._id}`)}
    >
        {
            !auth.user.profile_picture
                ? <img
                    className="w-full h-full object-center object-cover"
                    alt={auth.user.name}
                    src="/default-avatar.png"
                />
                : auth.user.profile_picture.loading
                    ? <LoaderCircle className="w-5 h-5 text-sky-600 animate-spin"/>
                    : auth.user.profile_picture.error
                        ? <X className="w-5 h-5 text-black"/>
                        : <img
                            className="w-full h-full object-center object-cover"
                            alt={auth.user.name}
                            src={auth.user.profile_picture.data}
                        />
        }
    </div>
}