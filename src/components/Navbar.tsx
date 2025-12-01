type NavbarProps = {
    children: React.ReactNode
}

export default function Navbar({children}: NavbarProps){
    return <>
        <div className="w-full h-20" />
        <nav className="fixed top-0 left-0 w-full h-20 bg-sky-600 border-b-2 border-b-sky-800">
            <div className="w-full h-full px-4 flex justify-between items-center gap-4">
                {children}
            </div>
        </nav>
    </>
}