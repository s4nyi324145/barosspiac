import { useState } from "react"
import Navbar from "../components/Navbar"
import FilterContainer from "../components/filterContainer"
import BrowserSite from "../components/BrowserSite"
import Footer from "../components/Footer"
import { X } from "lucide-react"

export default function Browser(){

    const [filter,setFilter] = useState({
        category: null,
        subcategory: null,
        item: null,
        priceMin: null,
        priceMax: null,
        condition: [],
        subject: null,
        size: []
    })

    const [showFilters, setShowFilters] = useState(false)

return (
    <>
        <Navbar />
        
        {/* Mobil filter blur*/}
        {showFilters && (
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setShowFilters(false)}
            />
        )}

        {/* Mobil filter panel */}
        <div className={`fixed top-0 left-0 h-full w-72 bg-slate-900 border-r border-slate-800 z-50 md:hidden overflow-y-auto transition-transform duration-300 ${
            showFilters ? 'translate-x-0' : '-translate-x-full'
        }`}>
            {/* Fejléc */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <p className="text-white font-semibold">Szűrők</p>
                <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
            <FilterContainer filter={filter} setFilter={setFilter} />
        </div>

        <div className="flex">
            {/* Desktop filter — normál */}
            <div className="hidden md:flex">
                <FilterContainer filter={filter} setFilter={setFilter} />
            </div>
            <BrowserSite showFilters={showFilters} setShowFilters={setShowFilters} filter={filter} setFilter={setFilter} />
        </div>

        <Footer />
    </>
)

}