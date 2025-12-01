import { useFormContext } from "react-hook-form"

type TextareaProps = {
    name: string,
    id?: string,
    label?: string,
    className?: string,
}

export default function Input({name, id, label, className}: TextareaProps){
    
    const {register, formState: {errors}} = useFormContext()
    
    return <div className={`${className} w-full`}>
        {
            label || errors[name] && <div className="w-full mb-2 flex items-center justify-between gap-2">
                {
                    label && <label 
                        htmlFor={id}
                        className="text-black text-xl font-medium"
                    >
                        {label}
                    </label>
                }
                {
                    errors[name] && <label
                        className="text-red-600 text-xl font-medium"
                    >
                        {typeof errors[name].message === "string" && errors[name].message}
                    </label>
                }
            </div>
        }
        <textarea
            {...register(name)}
            id={id}
            className="w-full min-h-60 outline-none border-2 border-black/20 rounded-lg px-2 text-xl text-black focus:bg-sky-500 focus:border-4"
        />
    </div>
}