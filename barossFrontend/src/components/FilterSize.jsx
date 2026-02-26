
export default function FilterSize(){

    let sizes = [

        {name: "XS"},
        {name: "S"},
        {name: "M"},
        {name: "L"},
        {name: "XL"},
        {name: "XXL"},
    ]

    return(<>
        <div className="flex flex-col p-3 gap-1">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 py-2">
                    Méret
                </h2>
                <div className="flex flex-col gap-4 text-white flex-wrap">
                    
                    {sizes.map((s,index) => (
                        <div key={index} className="flex flex-1 text-center items-center gap-2 border rounded-md px-3 py-1 cursor-pointer hover:bg-white hover:text-slate-950 transition-all duration-300">
                            <p className="text-center">{s.name}</p>
                        </div>
                    ))}
                </div>                           
            </div>  
    
    </>)
}