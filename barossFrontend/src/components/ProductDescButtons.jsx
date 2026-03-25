import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"
import { Flag, Pencil, Trash2 } from "lucide-react"
export default function ProductDescButton({ openReportModal, productDetail, setOpenReportModal }) {

    const { user } = useAuth()
    if(!user) return null
    const navigate = useNavigate()

    return (<>

        <div className="flex items-end gap-2">
      
            {user?.user_id !== productDetail?.user_id &&
                <button
                    onClick={() => user ? setOpenReportModal(true) : navigate("/login")}
                    className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-white border border-red-500/30 hover:bg-red-500/20 px-3 py-2 rounded-xl transition-all duration-200"
                >
                    <Flag className="w-4 h-4" />
                    Jelentés
                </button>}

            {/* Szerkesztés + Törlés — csak saját hirdetésnél */}
            {user?.user_id === productDetail?.user_id && (
                <>
                    <button
                        onClick={() => navigate(`/upload/${productDetail.product_id}`)}
                        className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white border border-slate-700/60 hover:bg-slate-800 px-3 py-2 rounded-xl transition-all duration-200"
                    >
                        <Pencil className="w-4 h-4" />
                        Szerkesztés
                    </button>
                    <button
                        onClick={() => setOpenDeleteModal(true)}
                        className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-white border border-red-500/30 hover:bg-red-600 px-3 py-2 rounded-xl transition-all duration-200"
                    >
                        <Trash2 className="w-4 h-4" />
                        Törlés
                    </button>
                </>
            )}
        </div>

    </>)
}