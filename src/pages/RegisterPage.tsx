import { Link } from "react-router"
import RegisterForm from "../auth/components/RegisterForm"

export default function RegisterPage (){
    return <div className="w-full max-w-xl mx-auto py-12">
        <h1 className="w-full text-center text-black font-bold text-3xl mb-12">
            Register now!
        </h1>
        <RegisterForm />
        <p className="text-lg text-black text-center mt-4">
            Already registered? <Link to="/auth/login" className="text-sky-600">Log in.</Link>
        </p>
    </div>
}