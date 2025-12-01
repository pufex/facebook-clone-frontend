import RegisterForm from "../auth/components/RegisterForm"

export default function RegisterPage (){
    return <div className="w-full max-w-lg mx-auto py-12">
        <h1 className="w-full text-center text-black font-bold">
            Register now!
        </h1>
        <RegisterForm />
    </div>
}