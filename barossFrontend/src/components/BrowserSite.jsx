import { X } from "lucide-react"
import BrowserCards from "./BrowserCards"
export default function BrowserSite({ filter, setFilter }) {

    return (<>

        <div className="flex-1 bg-slate-950 p-4">
            <div className="flex gap-2 pb-3 flex-wrap items-center">

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
            <BrowserCards filter={filter} setFilter={setFilter} />
        </div>


    </>)
}


