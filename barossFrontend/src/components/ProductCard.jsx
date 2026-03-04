import { MapPin } from "lucide-react"
import {  useNavigate } from "react-router-dom"

export default function ProductCard({ p }) {

    const navigate = useNavigate()

    return (<>
        <div onClick={() => navigate(`/product/${p.product_id}`)}
            key={p.product_id}
            className=" cursor-pointer  bg-slate-900 border border-slate-700/60 hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-blue-500/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-200"
        >
            {/* Kép */}
            <div className="w-full h-36 bg-slate-800 flex items-center justify-center text-slate-600 text-sm relative">
                kép
                {/* Állapot badge */}
                <span className={`absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full ${p.product_condition === 'uj' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        p.product_condition === 'kivalo' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            p.product_condition === 'jo' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                    {p.product_condition === 'uj' ? 'Új' :
                        p.product_condition === 'kivalo' ? 'Kiváló' :
                            p.product_condition === 'jo' ? 'Jó' : 'Kielégítő'}
                </span>

                {/* Méret badge  */}
                {p.product_size && (
                    <span className="absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-700/80 text-slate-300 border border-slate-600/50">
                        {p.product_size}
                    </span>
                )}
            </div>

            {/* Tartalom */}
            <div className="p-3 flex flex-col  gap-2">

                {/* Kategória */}
                <p className="text-xs text-slate-500">{p.category_name} · {p.sub_category_name}</p>

                {/* Cím + ár */}
                <div className="flex justify-between items-start gap-2">
                    <p className="text-white text-sm font-semibold truncate">{p.product_title}</p>
                    <span className="text-blue-400 text-sm font-bold shrink-0">{p.product_price.toLocaleString('en')} Ft</span>
                </div>

                {/* Átadás helye */}
                <p className="text-slate-500 text-xs truncate flex items-center gap-1"><MapPin className="text-red-600" size={16} /> {p.product_collpoint}</p>

            </div>
        </div>
    </>)
}