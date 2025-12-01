import {z} from "zod"

const registerFormSchema = z.object({
    name: z.string().min(1, {error: "Required"}),
    surname: z.string().min(1, {error: "Required"}),
    email: z.string(),
    password: z.string().min(1, {error: "Required"})
})

export default registerFormSchema