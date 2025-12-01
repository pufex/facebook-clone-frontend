import LoginForm from "../auth/components/LoginForm"
import { Link } from "react-router"

export default function LoginPage (){
    return <div className="w-full max-w-sm mx-auto py-12">
        <h1 className="w-full text-center text-black font-bold text-3xl mb-6">
            Log in
        </h1>
        <LoginForm />
        <p className="text-lg text-black text-center mt-4">
            New? Create an account <Link to="/auth/register" className="text-sky-600">now!</Link>
        </p>
    </div>
}