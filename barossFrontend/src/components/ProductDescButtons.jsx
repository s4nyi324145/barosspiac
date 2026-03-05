import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"
export default function ProductDescButton({openReportModal, setOpenReportModal}){

    const {user} = useAuth()
    const navigate = useNavigate()

    return(<>

        <div className="flex items-end gap-6">
            <button className="bg-blue-600 p-2 hover:bg-blue-500  text-white font-semibold rounded-xl transition-all duration-200 shadow-lg">
                Hírdetés Megosztás
            </button>
            <button onClick={() => user ? setOpenReportModal(!openReportModal)  :  navigate("/login") } className="bg-red-600/60 p-2 hover:bg-red-600  text-white font-semibold rounded-xl transition-all duration-200 shadow-lg">
                Hírdetés Jelentése
            </button>
        </div>
        
    </>)
}