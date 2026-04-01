import ProductCardSkeleton from "../components/ProductCardSkeleton"
import ProductCard from "../components/ProductCard"
import { Heart, ArrowRight,ArrowUpDown } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
export default function FavoritesContainer({ loading, likedProducts }) {

    const [filter, setFilter] = useState({sort: ""})
    const [filteredProduct, setFilteredProduct] = useState([])

    useEffect(() => {
        let result = [...likedProducts];
    
        if (filter.sort) {
            switch (filter.sort) {
                case "ar_csokkeno":
                    result = result.sort((a, b) => b.product_price - a.product_price);
                    break;
                case "ar_novekvo":
                    result = result.sort((a, b) => a.product_price - b.product_price);
                    break;
                case "legujabb":
                    result = result.sort((a, b) => b.product_id - a.product_id);
                    break;
                case "legregebbi":
                    result = result.sort((a, b) => a.product_id - b.product_id);
                    break;
            }
        }

        setFilteredProduct(result);
    }, [likedProducts, filter]);


    return (<>

        
        <div className="relative p-5 flex justify-end bg-slate-950">
            <select
                name="sort"
                id="sort"
                onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
                className="bg-slate-800/60 border border-slate-700/60 rounded-xl pl-4 pr-8 py-2.5 text-sm text-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 appearance-none cursor-pointer"
            >
                <option value="">Alapértelmezett</option>
                <option value="ar_csokkeno">Ár szerint csökkenő</option>
                <option value="ar_novekvo">Ár szerint növekvő</option>
                <option value="legujabb">Legújabbak</option>
                <option value="legregebbi">Legrégebbiek</option>
            </select>
            <ArrowUpDown className="absolute right-8 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
        </div>

        {likedProducts.length > 0 ?
            <div className="grid bg-slate-950 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-auto scrollbar-hide  min-h-screen max-h-screen auto-rows-min  xl:grid-cols-5 gap-3 p-4 ">
                {loading
                    ? Array.from({ length: 12 }).map((_, i) => <ProductCardSkeleton key={i} />)
                    : filteredProduct.map(p => <ProductCard key={p.product_id} p={p} />)
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