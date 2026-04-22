import { useAuth } from "../context/authContext"

export default function RegisterButton() {
    const { user } = useAuth();

    return(<>
        <a
        href={user ? "/upload" : "/register"}
        
        className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl transition-colors duration-200 shadow-lg shadow-blue-600/20"
      >
        {user ? "Hirdetés feladása" : "Regisztráció"}
      </a>
        
    </>)
}