import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"
import Button from "../../components/Button"
import Input from "../../components/Input"
import registerFormSchema from "../zod/registerFormSchema"
import { AxiosError } from "axios"
import { useNavigate } from "react-router"
import { LoaderCircle } from "lucide-react"

type RegisterFields = z.infer<typeof registerFormSchema>

export default function RegisterFunction (){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const {register} = useAuth()
    const methods = useForm<RegisterFields>({
        resolver: zodResolver(registerFormSchema)
    })
    const {formState: {errors}, handleSubmit, setError} = methods

    const onSubmit = async (data: RegisterFields) => {
        try{
            setLoading(true)
            await register(data)
            navigate("/auth/login")
        }catch(err){
            if(err instanceof AxiosError){
                switch(err.response?.status){
                    case 400:
                        setError("root", {message: "Invalid credentials."})
                        break;
                    case 409: 
                        setError("root", {message: "This Email Address is already taken."})
                        break;
                    default: 
                        setError("root", {message: "There was a problem with creating your account."})
                        break;
                }
            }else{
                setError("root", {message: "There was a problem with creating your account."})
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
            <div className="w-full flex items-center justify-between gap-2 mb-4">
                <Input
                    name="name"
                    id="name"
                    label="Name"
                    placeholder="Your name..."
                    className="w-full"
                />
                <Input
                    name="surname"
                    id="surname"
                    label="Surname"
                    placeholder="Your surname..."
                    className="w-full"
                />
            </div>
            <Input 
                name="email"
                id="email"
                type="email"
                label="Email Address"
                placeholder="Email Address..."
                className="w-full mb-4"
            />
            <Input 
                name="password"
                id="password"
                type="password"
                label="Password"
                placeholder="********"
                className="w-full mb-10"
            />
            <Button
                type="submit"
                disabled={loading}
                className="w-full"
            >
                {
                    loading
                        ? <>
                            Creating...
                            <LoaderCircle className="w-6 h-6 text-white animate-spin" />
                        </>
                        : "Create Account"
                }
            </Button>
        </form>
    </FormProvider>

}