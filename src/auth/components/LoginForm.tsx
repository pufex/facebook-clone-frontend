import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"
import { useLocation } from "react-router"
import Button from "../../components/Button"
import Input from "../../components/Input"
import loginFormSchema from "../zod/loginFormSchema"
import { AxiosError } from "axios"
import { useNavigate } from "react-router"
import { LoaderCircle } from "lucide-react"

type LoginFields = z.infer<typeof loginFormSchema>

export default function RegisterFunction (){
    const {state} = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const {login} = useAuth()
    const methods = useForm<LoginFields>({
        resolver: zodResolver(loginFormSchema)
    })
    const {formState: {errors}, handleSubmit, setError} = methods

    const onSubmit = async (data: LoginFields) => {
        try{
            setLoading(true)
            await login(data)
            if(state.previous){
                navigate(state.previous)
            }else{
                navigate("/")
            }
        }catch(err){
            if(err instanceof AxiosError){
                switch(err.response?.status){
                    case 400:
                        setError("root", {message: "Invalid credentials."})
                        break;
                    case 409: 
                        setError("root", {message: "Invalid Email or Password."})
                        break;
                    default: 
                        setError("root", {message: "There was a problem with logging in."})
                        break;
                }
            }else{
                setError("root", {message: "There was a problem with logging in."})
            }
        }finally{
            setLoading(false)
        }
    }

    return <FormProvider {...methods}>
        <form
            className="w-full px-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            {
                errors.root && <p className="mb-6 text-red-600 font-semibold text-center w-full">
                    {typeof errors.root.message === "string" && errors.root.message}
                </p>
            }
            <Input 
                name="email"
                id="email"
                type="email"
                label="Email Address"
                placeholder="Email Address..."
                className="w-full mb-2"
            />
            <Input 
                name="password"
                id="password"
                type="password"
                label="Password"
                placeholder="********"
                className="w-full mb-4"
            />
            <Button
                type="submit"
                disabled={loading}
            >
                {
                    loading
                        ? <>
                            Logging in...
                            <LoaderCircle className="w-6 h-6 text-white animate-spin" />
                        </>
                        : "Log in"
                }
            </Button>
        </form>
    </FormProvider>

}