export default function FilterClass(){

    return(<>
     <div className="flex  flex-col flex-1 p-3 gap-1">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 py-2">
                    Osztály
                </h2>
                <div className="relative">
                    <select   className="w-full  bg-slate-800/60 border  border-slate-700/60 rounded-xl  p-2 text-sm text-slate-200 outline-none focus:border-blue-500 focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 appearance-none cursor-pointer">
                        <option value="mind">Bármelyik</option>
                        <option value="12a">12/A</option>
                        <option value="12b">12/B</option>
                        <option value="11a">11/A</option>
                        <option value="11b">11/B</option>
                        <option value="10a">10/A</option>
                        <option value="10b">10/B</option>
                        <option value="9a">9/A</option>
                        <option value="9b">9/B</option>
                    </select>   
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500  pointer-events-none">▾</span>
                </div>                
            </div>
        
    </>)
}