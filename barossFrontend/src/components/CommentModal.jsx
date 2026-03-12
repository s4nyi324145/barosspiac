import { X, Star } from "lucide-react"
import { useState} from "react"
import { useAuth } from "../context/authContext"
import { useParams } from "react-router-dom"
import { useToast } from "../context/toastContext"
import api from "../config/api"
export default function CommentModal({getUserData,getProductCards,setOpenCommentModal }) {

    const [hoveredStar, setHoveredStar] = useState(0)
    const [selectedStar, setSelectedStar] = useState(0)
    const [loading,setLoading]= useState(false)
    const [text, setText] = useState('')
    const {showSuccess} = useToast()
    const {user} = useAuth()
    const { user_id } = useParams()

    const sendComment = async() =>{
        setLoading(true)
        try {
            const result = api.post("/ratings/postRatings",{
                 rate: selectedStar,
                 text: text,
                 rated_id: user_id,
                 rater_id: user.user_id
            })
            setTimeout(() => { 
                setLoading(false)
                setOpenCommentModal(false)
                getProductCards()
                getUserData()
                showSuccess("Értékelés sikeresen hozzáadva")
             }, 1500)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="text-white flex flex-col bg-slate-900 border border-slate-700/60 rounded-2xl p-6 w-full max-w-md shadow-2xl gap-5">

                {/* Fejléc */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-lg font-bold text-white">Értékeld a felhasználót</h1>
                        <p className="text-slate-500 text-xs">Az értékelések segítenek megtalálni a megfelelő eladót</p>
                    </div>
                    <button onClick={() => setOpenCommentModal(false)} className="text-slate-500 hover:text-white transition-colors duration-200">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Csillagok */}
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-slate-400">Értékelés megadása</p>
                    <div className="flex gap-2" onMouseLeave={() => setHoveredStar(0)}>
                        {[1,2,3,4,5].map(star => (
                            <Star
                                key={star}
                                size={28}
                                onClick={() => setSelectedStar(star)}
                                onMouseEnter={() => setHoveredStar(star)}
                                className={`cursor-pointer transition-all duration-150 hover:scale-110 ${
                                    star <= (hoveredStar || selectedStar)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-slate-700 text-slate-700"
                                }`}
                            />
                        ))}
                    </div>
                    {selectedStar > 0 && (
                        <p className={`
                            text-xs font-medium px-2 py-1 w-fit rounded-md 
                            ${selectedStar === 1 ? 'bg-red-400 text-red-900' :
                            selectedStar === 2 ? 'bg-orange-400 text-orange-900' :
                            selectedStar === 3 ? 'bg-yellow-400 text-yellow-900' :
                            selectedStar === 4 ? 'bg-blue-400 text-blue-900' :
                                                'bg-green-400 text-green-900'}
                        `}>
                            {selectedStar === 1 ? 'Nagyon rossz' :
                            selectedStar === 2 ? 'Rossz' :
                            selectedStar === 3 ? 'Megfelelő' :
                            selectedStar === 4 ? 'Jó' : 'Kiváló'}
                        </p>
                    )}
                </div>
                <p className="text-sm text-slate-400">Tapasztalat leírása</p>
                {/* Szöveg */}
                <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Írd le tapasztalataidat... (opcionális)"
                    className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none h-24"
                />

                {/* Gombok */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setOpenCommentModal(false)}
                        className="flex-1 py-2.5 rounded-xl border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium transition-all duration-200"
                    >
                        Mégse
                    </button>
                    <button
                        disabled={selectedStar === 0}
                        onClick={() => sendComment()}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                            selectedStar > 0
                                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
                                : "bg-slate-800 text-slate-600 cursor-not-allowed"
                        }`}
                    >
                        
                        {loading ?
                            <span className="flex items-center gap-2 justify-center">
                                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                                <p className="text-sm">Jelentés küldése</p>
                            </span> : "Jelentés küldése"}
                    </button>
                </div>

            </div>
        </div>
    )
}