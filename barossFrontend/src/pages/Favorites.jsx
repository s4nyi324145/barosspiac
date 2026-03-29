import Navbar from "../components/Navbar"
import Categories from "../components/Categories"
import FavoritesHeader from "./FavoritesHeader"
import api from "../config/api"
import { useEffect, useState } from "react"
import FavoritesContainer from "../components/FavoritesContainer"
import { useToast } from "../context/toastContext"
import { Trash2 } from "lucide-react"
import Footer from "../components/Footer"
export default function Favorites() {


    const [likedProducts, setLikedProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showWarningModal, setShowWarningModal] = useState(false)
    const { showSuccess } = useToast()

    const getLikedProducts = async () => {

        try {
            const result = await api.get('/likes/alllikes')
            setLikedProducts(result.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const deleteAllLikes = async () => {
        try {
            const result = await api.delete('likes/alllike')
            showSuccess(result.data.message)
            setLikedProducts([])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { getLikedProducts() }, [])
    useEffect(() => { console.log(likedProducts) }, [likedProducts])


    return (<>
        <div className="flex flex-col">
            {showWarningModal && (
                <div className="fixed   inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border animate-[scale-in_0.15s_ease-out]   border-slate-700/60 rounded-2xl p-6 w-full max-w-md flex flex-col gap-5 shadow-2xl">

                        {/* Fejléc */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0">
                                <Trash2 className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                                <h2 className="text-white font-bold">Összes kedvenc törlése</h2>
                                <p className="text-slate-500 text-xs">Ez a művelet nem visszavonható</p>
                            </div>
                        </div>

                        {/* Szöveg */}
                        <p className="text-slate-400 text-sm">
                            Biztosan törölni szeretnéd az összes kedvenc hirdetésedet? A lista véglegesen kiürül.
                        </p>

                        {/* Gombok */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowWarningModal(false)}
                                className="flex-1 py-2.5 rounded-xl border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium transition-all duration-200"
                            >
                                Mégse
                            </button>
                            <button
                                onClick={() => { deleteAllLikes(); setShowWarningModal(false) }}
                                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-red-600/20"
                            >
                                Törlés
                            </button>
                        </div>

                    </div>
                </div>
            )}
            <Navbar />
            <Categories />
            <FavoritesHeader deleteAllLikes={deleteAllLikes} setShowWarningModal={setShowWarningModal} showWarningModal={showWarningModal} favoritesCount={likedProducts.length} />
            <FavoritesContainer loading={loading} likedProducts={likedProducts} />
            <Footer/>
        </div>
    </>)
}