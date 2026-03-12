import ProductCardSkeleton from "../components/ProductCardSkeleton"
import ProductCard from "../components/ProductCard"
import { Heart, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
export default function FavoritesContainer({ loading, likedProducts }) {




    return (<>
        {likedProducts.length > 0 ?
            <div className="grid bg-slate-950 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-auto scrollbar-hide  min-h-screen max-h-screen auto-rows-min  xl:grid-cols-5 gap-3 p-4 ">
                {loading
                    ? Array.from({ length: 12 }).map((_, i) => <ProductCardSkeleton key={i} />)
                    : likedProducts.map(p => <ProductCard key={p.product_id} p={p} />)
                }
            </div>
            :
            <div className="bg-slate-950 flex flex-col items-center justify-start pt-12 min-h-screen gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700/60 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-slate-600" />
                </div>
                <div className="flex flex-col gap-1 text-center">
                    <p className="text-white font-semibold text-lg">Még nincs kedvenc hirdetésed</p>
                    <p className="text-slate-500 text-sm max-w-xs">Böngéssz a hirdetések között és mentsd el amit megszeretnél.</p>
                </div>
            <Link 
                to="/browser"
                className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20 mt-2"
            >
                Böngészés <ArrowRight className="w-4 h-4" />
            </Link>
            </div>
   
     }
    </>)
}