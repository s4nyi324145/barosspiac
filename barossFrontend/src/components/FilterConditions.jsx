import { useEffect, useState } from "react"

export default function FilterConditions({filter,setFilter}) {

    const conditions = [
        { name: "Új", desc: "Soha nem volt használva, eredeti csomagolásban vagy címkével." },
        { name: "Kiváló", desc: "Alig használt, szinte hibátlan állapot, minimális nyomok." },
        { name: "Jó", desc: "Láthatóan használt de jól funkcionál, kisebb kopásnyomok lehetnek." },
        { name: "Kielégítő", desc: "Erősen használt, látható hibák vagy kopás, de még működőképes." },
    ]

    const [addedCon, setAddedCond] = useState([])
    
    useEffect(() => {

        setFilter((filter) => ({...filter,condition: addedCon}))

    }, [addedCon])

    return(<>
        <div className="flex flex-col p-3 gap-1">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 py-2">
                    Állapot
                </h2>
                <div className="flex gap-4 text-white flex-wrap">
                    {conditions.map((c,index) => (
                        <div key={index} onClick={() => setAddedCond(addedCon => addedCon.includes(c.name) ? addedCon.filter(a => a !== c.name) : [...addedCon, c.name] )}  className={`border ${addedCon.includes(c.name) ? "bg-white text-slate-950 hover:text-white hover:bg-slate-700 " : "hover:bg-white  hover:text-slate-950"}  transition-all duration-300 cursor-pointer rounded-full px-3 py-1`}>
                            <p>{c.name}</p>
                        </div>
                    ))}
                    
                </div>                           
        </div>
        
    </>)
}