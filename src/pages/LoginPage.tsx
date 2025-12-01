import LoginForm from "../auth/components/LoginForm"

export default function LoginPage (){
    return <div className="w-full max-w-lg mx-auto py-12">
        <h1 className="w-full text-center text-black font-bold">
            Log in
        </h1>
        <LoginForm />
    </div>
}