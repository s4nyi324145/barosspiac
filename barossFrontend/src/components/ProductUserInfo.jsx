
import { useEffect, useState } from "react"
import { Star } from 'lucide-react'
import api from "../config/api"
import { useNavigate } from "react-router-dom"

export default function ProductUserInfo({ productDetail }) {

    if(!productDetail) return null
    const navigate = useNavigate()

    const [ratings, setRatings] = useState(0)
    const getRatingsById = async () => {
        try {
            const result = await api.get(`/ratings/${productDetail.user_id}`)
            setRatings(result.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { getRatingsById() }, [])
    useEffect(() => { console.log(ratings); }, [ratings])






    return (<>
        {/* Eladó szekció */}
        <div className="flex items-center gap-5 w-fit bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                {productDetail.fullname?.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-0.5 flex-1">
                <p onClick={() => navigate(`/profile/${productDetail.user_id}`)} className="text-white text-sm font-semibold cursor-pointer">{productDetail.fullname}</p>
                <p className="text-slate-500 text-xs">{productDetail.userClass}</p>
            </div>

            {/* Értékelés */}
            <div className="flex flex-col items-end pl-5 gap-0.5">
                <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-semibold">
                        {ratings?.avg ? Number(ratings.avg).toFixed(1) : '—'}
                    </span>
                </div>
                <p className="text-slate-500 text-xs">
                    {ratings?.db ?? 0} értékelés
                </p>
            </div>

        </div>

    </>)
}