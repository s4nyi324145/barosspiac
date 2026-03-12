import { MapPin } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Heart } from "lucide-react"
import api from "../config/api"
import { useState } from "react"
import { useToast } from "../context/toastContext"

export default function ProductCard({ p }) {

    const [isLiked, setIsLiked] = useState(p.is_liked == 1);
    const {showSuccess} = useToast()

    const navigate = useNavigate()
    const sendLike = async () => {
        try {
            const result = await api.post('/likes/like', { product_id: p.product_id })
            showSuccess(result.data.message)

        } catch (error) {
            console.log(error)
            error.response?.status === 401 && navigate('/login')
        }
    }

    const removeLike = async () => {
        try {
            const result = await api.delete(`/likes/unlike/${p.product_id}`)
            showSuccess(result.data.message)

        } catch (error) {
            console.log(error)
        }
    }

    const handleLike = (e) => {
        e.stopPropagation();
        
        if (isLiked) {
            removeLike();
            setIsLiked(false);
        } else {
            sendLike();
            setIsLiked(true);
        }
    };

    return (<>
        <div onClick={() => navigate(`/product/${p.product_id}`)}
            key={p.product_id}
            className=" cursor-pointer group   bg-slate-900 border border-slate-700/60 hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-blue-500/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-200"
        >

            {/* Kép */}
            <div className="w-full h-36 bg-slate-800 flex items-center justify-center text-slate-600 text-sm relative">
                kép
                {/* Állapot badge */}
                <span className={`absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full ${p.product_condition === 'Új' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    p.product_condition === 'Kiváló' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        p.product_condition === 'Jó' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                            'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                    {p.product_condition}
                </span>

                {/* Méret badge  */}
                {p.product_size && (
                    <span className="absolute top-10 left-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-700/80 text-slate-300 border border-slate-600/50">
                        {p.product_size}
                    </span>
                )}

                <span className="absolute top-2 right-2 cursor-pointer">
                    <Heart
                        onClick={(e) => { handleLike(e) }}
                        className={`w-5 h-5 transition-all duration-200 hover:scale-110 ${isLiked
                                ? "fill-red-500 text-red-500"
                                : "fill-transparent opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400"
                            }`}
                    />
                </span>

            </div>

            {/* Tartalom */}
            <div className="p-3 flex flex-col  gap-2">

                {/* Kategória */}
                <p className="text-xs text-slate-500">{p.category_name} · {p.sub_category_name}</p>

                {/* Cím + ár */}
                <div className="flex justify-between items-start gap-2">
                    <p className="text-white text-sm font-semibold truncate">{p.product_title}</p>
                    <span className="text-blue-400 text-sm font-bold shrink-0">{p.product_price?.toLocaleString('en')} Ft</span>
                </div>

                {/* Átadás helye */}
                <p className="text-slate-500 text-xs truncate flex items-center gap-1"><MapPin className="text-red-600" size={16} /> {p.product_collpoint}</p>

            </div>
        </div>
    </>)
}