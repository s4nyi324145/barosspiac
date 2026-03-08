import { X, ArrowUpDown   } from "lucide-react"
import BrowserCards from "./BrowserCards"
export default function BrowserSite({ filter, setFilter }) {

    return (<>

        <div className="flex-1 bg-slate-950 p-4">
            <div className="mb-5">
                <h1 className="text-3xl font-medium pl-3 text-blue-400">Felfedezés</h1>
                <p className="text-white text-sm pl-3">Fedezd fel a legjobb ajánlatokat kategóriák szerint szűrve!</p>
            </div>
            <div className="flex gap-2 pb-3 flex-wrap items-center justify-between border-b border-slate-700/50 mb-4">

                <div className="flex gap-2 flex-wrap">
                    {filter.category && (
                        <div className="flex items-center gap-1.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full px-3 py-1 text-md font-medium">
                            <span>{filter.category}</span>
                            <X className="w-3 h-3 cursor-pointer hover:text-white transition-colors" onClick={() => setFilter({ ...filter, category: null })} />
                        </div>
                    )}

                    {filter.subcategory && (
                        <div className="flex items-center gap-1.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full px-3 py-1 text-md font-medium">
                            <span>{filter.subcategory}</span>
                            <X className="w-3 h-3 cursor-pointer hover:text-white transition-colors" onClick={() => setFilter({ ...filter, subcategory: null })} />
                        </div>
                    )}

                    {filter.item && (
                        <div className="flex items-center gap-1.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full px-3 py-1 text-md font-medium">
                            <span>{filter.item}</span>
                            <X className="w-3 h-3 cursor-pointer hover:text-white transition-colors" onClick={() => setFilter({ ...filter, item: null })} />
                        </div>
                    )}

                    {filter.condition?.length > 0 && filter.condition.map((con, index) => (
                        <div key={index} className="flex items-center gap-1.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-3 py-1 text-md font-medium">
                            <span>{con}</span>
                            <X className="w-3 h-3 cursor-pointer hover:text-white transition-colors" onClick={() => setFilter({ ...filter, condition: filter.condition.filter((_, i) => i !== index) })} />
                        </div>
                    ))}

                    {filter.size?.length > 0 && filter.size.map((s, index) => (
                        <div key={index} className="flex items-center gap-1.5 bg-violet-500/20 text-violet-400 border border-violet-500/30 rounded-full px-3 py-1 text-md font-medium">
                            <span>{s}</span>
                            <X className="w-3 h-3 cursor-pointer hover:text-white transition-colors" onClick={() => setFilter({ ...filter, size: filter.size.filter((_, i) => i !== index) })} />
                        </div>
                    ))}

                    {filter.subject && (
                        <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full px-3 py-1 text-md font-medium">
                            <span>{filter.subject}</span>
                            <X className="w-3 h-3 cursor-pointer hover:text-white transition-colors" onClick={() => setFilter({ ...filter, subject: null })} />
                        </div>
                    )}
                </div>
                <div className="relative">
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
                    <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                </div>

            </div>
            <BrowserCards filter={filter} setFilter={setFilter} />
        </div>


    </>)
}


