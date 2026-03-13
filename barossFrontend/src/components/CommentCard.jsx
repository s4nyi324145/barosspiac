import { Star } from "lucide-react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import { useToast } from '../context/toastContext'
import { Pencil, Trash2, X, Check } from "lucide-react";
import { useEffect, useState } from "react";
export default function CommentCard({ getUserData, getProductCards, p }) {

    const navigate = useNavigate()
    const { user } = useAuth()
    const [editingId, setEditingId] = useState(0)
    const [editedText, setEditedText] = useState(p.text)
    const [editedRating, setEditedRating] = useState(p.rate)
    const [hoveredStar, setHoveredStar] = useState(0)
    const { showSuccess } = useToast()

    //useEffect(() => { console.log(editedRating) }, [editedRating])

    const handleDelete = async (rating_id) => {
        try {
            const result = await api.delete(`/ratings/rating/${rating_id}`)
            getUserData()
            getProductCards()
            showSuccess("Értékelés sikeresen törölve")
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (rating_id) => {
        try {
            await api.post(`/ratings/updaterating/${rating_id}`, {
                text: editedText,
                rate: editedRating
            })
            setEditingId(null)  
            getUserData()
            getProductCards()
            showSuccess("Értékelés sikeresen módosítva")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-5  flex flex-col gap-3">

            {/* Fejléc */}
            <div className="flex flex-col items-start gap-4 justify-between">
                {editingId !== p.rating_id ?
                    <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className={`w-4 h-4 ${star <= p.rate
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-slate-700 text-slate-700'
                            }`} />
                    ))}
                    </div> :
                    <div className="flex gap-2"  onMouseLeave={() => setHoveredStar(0)}>
                        {[1,2,3,4,5].map(star => (
                            <Star
                                key={star}
                                size={20}
                                onClick={() => setEditedRating(star)}
                                onMouseEnter={() => setHoveredStar(star)}
                                className={`cursor-pointer transition-all duration-150 hover:scale-110 ${
                                    star <= (hoveredStar || editedRating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-slate-700 text-slate-700"
                                }`}
                            />
                        ))}
                    </div>
                
                }
                
                

                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {p.fullname?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <p onClick={() => navigate(`/profile/${p.rater_id}`)} className="text-white cursor-pointer text-sm font-semibold">{p.fullname}</p>
                        <p className="text-slate-500 text-xs">{new Date(p.created_at).toLocaleDateString('hu-HU')}</p>
                    </div>
                </div>

                {/* Csillagok */}

            </div>

            {/* Szöveg */}
            {editingId === p.rating_id ? (
                <input
                    type="text"
                    autoFocus
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    
                    className="text-sm bg-slate-800 text-white px-2 py-1 rounded"
                />
            ) : (
                <p className="text-slate-300 text-sm leading-relaxed">
                    {p.text}
                </p>
            )}

            {user.user_id == p.rater_id && (
                (editingId !== p.rating_id ?
                    <div className="flex gap-2">
                        <button
                            onClick={() => setEditingId(p.rating_id)}
                            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white border border-slate-700/60 hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-all duration-200"
                        >
                            <Pencil className="w-3.5 h-3.5" />

                        </button>
                        <button
                            onClick={() => handleDelete(p.rating_id)}
                            className="flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-white border border-red-500/30 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-all duration-200"
                        >
                            <Trash2 className="w-3.5 h-3.5" />

                        </button>
                    </div> :
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleEdit(p.rating_id)}
                            className="flex items-center gap-1.5 text-xs font-medium text-white hover:text-white border border-green-700/60 hover:bg-green-800 px-3 py-1.5 bg-green-600 rounded-lg transition-all duration-200"
                        >
                            <Check className="w-3.5 h-3.5" />

                        </button>
                        <button
                            onClick={() => setEditingId(null)}
                            className="flex items-center gap-1.5 text-xs font-medium text-white hover:text-white border border-red-500/30 hover:bg-red-500/20 bg-red-700 px-3 py-1.5 rounded-lg transition-all duration-200"
                        >
                            <X className="w-3.5 h-3.5" />

                        </button>
                    </div>
                )
            )}

        </div>
    );
}