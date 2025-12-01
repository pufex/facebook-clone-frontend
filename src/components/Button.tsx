type ButtonProps = {
    className?: string,
    type?: "button" | "submit",
    onClick?: () => void,
    disabled?: boolean,
    children?: React.ReactNode
}

export default function Button({className, type = "button", onClick, disabled, children}: ButtonProps){
    return <button
        className={`${className} h-10 px-8 text-white rounded-lg border-2 flex items-center justify-center gap-2 ${disabled ? "bg-sky-300 cursor-not-allowed border-sky-600" : "bg-sky-600 border-sky-800 cursor-pointer"}`}
        onClick={onClick}
        disabled={disabled}
        type={type}
    >
        {children}
    </button>
}   