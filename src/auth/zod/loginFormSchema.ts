import {z} from "zod"

const loginFormSchema = z.object({
    email: z.email(),
    password: z.string().min(1, {error: "Required"})
})

export default loginFormSchema