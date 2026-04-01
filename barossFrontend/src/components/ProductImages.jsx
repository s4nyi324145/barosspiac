import { useState } from "react"
import { ChevronLeft, ChevronRight, X, ZoomIn, Check } from "lucide-react"

export default function ProductImages({ product_img, is_sold }) {

    const [selected, setSelected] = useState(0)
    const [lightbox, setLightbox] = useState(false)
    console.log(product_img);

    // Ha nincs kép
    if (!product_img || product_img.length === 0) return (
        <div className="flex-[0.6] h-96 bg-slate-800 rounded-2xl flex items-center justify-center">
            <p className="text-slate-600 text-sm">Nincs kép</p>
        </div>
    )



    return (
        <>
            {/* Lightbox */}
            {lightbox && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <button
                        onClick={() => setLightbox(false)}
                        className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {product_img.length > 1 && (
                        <>
                            <button
                                onClick={() => setSelected(prev => prev === 0 ? product_img.length - 1 : prev - 1)}
                                className="absolute left-4 p-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-all duration-200"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setSelected(prev => prev === product_img.length - 1 ? 0 : prev + 1)}
                                className="absolute right-4 p-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-all duration-200"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}

                    <img
                        src={product_img[selected].product_img}
                        alt="Termék kép"
                        className="max-h-[85vh] max-w-full object-contain rounded-xl"
                    />
                </div>
            )}

            <div className="flex-[0.8] flex flex-col gap-3">

                {/* Főkép */}
                <div
                    onClick={() => setLightbox(true)}
                    className="relative max-h-96 min-w-fit bg-slate-800 rounded-2xl overflow-hidden cursor-zoom-in group"
                >
                    <img
                        src={product_img[selected].product_img}
                        alt="Termék kép"
                        className="min-w-full  object-fill transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-200" />
                    </div>
                    {/* Kép számlálő */}
                    {product_img.length > 1 && (
                        <span className="absolute bottom-3 right-3 text-xs bg-black/50 text-white px-2 py-1 rounded-full">
                            {selected + 1} / {product_img.length}
                        </span>
                    )}

                    {/*Eladva címke */}
                    {is_sold && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                                    <Check className="w-6 h-6 text-green-400" />
                                </div>
                                <span className="text-white font-bold text-lg tracking-wide">Eladva</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Thumbnail csík */}
                {product_img.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                        {product_img.map((img, i) => (
                            <div
                                key={i}
                                onClick={() => setSelected(i)}
                                className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${selected === i
                                        ? 'border-blue-500'
                                        : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                            >
                                <img src={img.product_img} alt="" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>
    )
}