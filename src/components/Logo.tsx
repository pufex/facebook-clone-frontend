import { useNavigate } from "react-router"

export default function Logo (){
    const navigate = useNavigate()
    return <div 
        className="font-[Science Gothic] w-10 h-10 rounded-full bg-linear-60 from-sky-700 to-sky-500 text-white text-center font-bold text-2xl cursor-pointer hover:from-sky-500 hover:to-sky-300"
        onClick={() => navigate("/")}
    >
        f
    </div>
}