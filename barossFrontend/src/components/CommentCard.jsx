import { Star } from "lucide-react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import { Pencil, Trash2 } from "lucide-react";
export default function CommentCard({ p }) {

    const navigate = useNavigate()
    const { user } = useAuth()

    const handleDelete = async(p) =>{
        try {
            const result = api.delete()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-5  flex flex-col gap-3">

            {/* Fejléc */}
            <div className="flex flex-col items-start gap-4 justify-between">
                <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className={`w-4 h-4 ${star <= p.rate
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-slate-700 text-slate-700'
                            }`} />
                    ))}
                </div>

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
            {p.text && (
                <p className="text-slate-300 text-sm leading-relaxed">{p.text}</p>
            )}

            {user.user_id == p.rater_id && (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEdit(p)}
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white border border-slate-700/60 hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-all duration-200"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                        Szerkesztés
                    </button>
                    <button
                        onClick={() => handleDelete(p.rating_id)}
                        className="flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-white border border-red-500/30 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-all duration-200"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        Törlés
                    </button>
                </div>
            )}

        </div>
    );
}