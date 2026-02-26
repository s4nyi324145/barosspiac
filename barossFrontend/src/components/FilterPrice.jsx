export default function FilterPrice() {

    return(<>
             <div className="flex flex-col p-3 gap-1">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 py-2">
                    Ár
                </h2>
                <div className="relative flex">
                    <input type="range" className="  absolute top-0 z-10" />
                    <input type="range" className="absolute top-0 z-11" />
                </div>                           
            </div>

        </>)
}