import { X } from "lucide-react"
export default function BrowserSite({filter,setFilter}) {

    return(<>

            <div className="flex-1 bg-slate-950 p-4 flex">
               <div className="flex gap-4  items-start justify-center">
                    {filter.category && <div className="rounded-md  px-2 py-1 items-center  border bg-white text-slate-950 flex"><p className="mr-2">{filter.category}</p><X className="w-4 h-4 cursor-pointer" onClick={() => setFilter({...filter, category: null})}/></div>}
                    {filter.subcategory && <div className="rounded-md   px-2 py-1 items-center  border bg-white text-slate-950 flex"><p className="mr-2">{filter.subcategory}</p><X className="w-4 h-4 cursor-pointer" onClick={() => setFilter({...filter, subcategory: null})}/></div>}
                    {filter.item && <div className="rounded-md   px-2 py-1 items-center  border bg-white text-slate-950 flex"><p className="mr-2">{filter.item}</p><X className="w-4 h-4 cursor-pointer" onClick={() => setFilter({...filter, item: null})}/></div>}
                    {filter.condition  && filter.condition.length > 0 &&<div className="rounded-md   px-2 py-1 items-center  border bg-white text-slate-950 flex"><p className="mr-2">{filter.condition}</p><X className="w-4 h-4 cursor-pointer" onClick={() => setFilter({...filter, condition: null})}/></div>}

               </div>
               
            </div>


    </>)
}