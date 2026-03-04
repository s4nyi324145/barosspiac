
import { MapPin, Heart, Clock } from "lucide-react"
import ProductUserInfo from "./ProductUserInfo"

export default function ProductDesc({ productDetail }) {

    if (!productDetail) return null

    return (<>
        <div className="flex flex-col flex-[0.4] gap-5 ml-3">
            <div className=" flex flex-col gap-4 border-l-2  border-blue-500 text-white p-4">

                {/* Cím + ár + Kategóriák */}
                <div className="flex flex-col gap-3">

                    {/* Breadcrumb */}
                    <p className="text-xs text-slate-500">
                        {productDetail.category_name}
                        <span className="mx-1.5">›</span>
                        {productDetail.sub_category_name}
                        <span className="mx-1.5">›</span>
                        {productDetail.sub_sub_name}
                    </p>

                    {/* Cím */}
                    <h1 className="text-2xl font-bold text-white">{productDetail.product_title}</h1>

                    {/* Ár */}
                    <p className="text-3xl font-bold text-blue-400">{productDetail.product_price.toLocaleString('hu-HU')} Ft</p>

                </div>



                {/* Állapot + méret */}
                <div className="flex gap-2 flex-wrap">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${productDetail.product_condition === 'uj' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        productDetail.product_condition === 'kivalo' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                            productDetail.product_condition === 'jo' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                                'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}>
                        {productDetail.product_condition === 'uj' ? 'Új' :
                            productDetail.product_condition === 'kivalo' ? 'Kiváló' :
                                productDetail.product_condition === 'jo' ? 'Jó' : 'Kielégítő'}
                    </span>

                    {productDetail.product_size && (
                        <span className="text-xs font-medium px-3 py-1 rounded-full border bg-slate-700/60 text-slate-300 border-slate-600/50">
                            {productDetail.product_size}
                        </span>
                    )}

                    {productDetail.product_subject && (
                        <span className="text-xs font-medium px-3 py-1 rounded-full border bg-amber-500/20 text-amber-400 border-amber-500/30">
                            {productDetail.product_subject}
                        </span>
                    )}
                </div>

                {/* Átadás helye */}
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <MapPin className="w-4 h-4 shrink-0 text-slate-500" />
                    <span>{productDetail.product_collpoint}</span>
                </div>

                {/* Feltöltés dátuma */}
                <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>Feltöltve: {new Date(productDetail.product_upload).toLocaleDateString('hu-HU')}</span>
                </div>

                {/* Leírás */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Leírás</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{productDetail.product_desc}</p>
                </div>

                {/* Gombok */}
                <div className="flex flex-col gap-2 mt-2">
                    <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:-translate-y-0.5">
                        Érdekel →
                    </button>
                    <button className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700/60 text-slate-300 hover:text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                        <Heart className="w-4 h-4" />
                        Kedvencekhez
                    </button>
                </div>

            </div>
                
            
            

        </div>
    </>)
}