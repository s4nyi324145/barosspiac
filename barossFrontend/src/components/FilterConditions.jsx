import { useEffect, useState } from "react"

export default function FilterConditions({filter,setFilter}) {

    const conditions = [
        { name: "Új", desc: "Soha nem volt használva, eredeti csomagolásban vagy címkével." },
        { name: "Kiváló", desc: "Alig használt, szinte hibátlan állapot, minimális nyomok." },
        { name: "Jó", desc: "Láthatóan használt de jól funkcionál, kisebb kopásnyomok lehetnek." },
        { name: "Kielégítő", desc: "Erősen használt, látható hibák vagy kopás, de még működőképes." },
    ]

    const [addedCon, setAddedCond] = useState(filter.condition)

    useEffect(() =>{setAddedCond(filter.condition)}, [filter.condition])
    
    useEffect(() => {

        setFilter((filter) => ({...filter,condition: addedCon}))
        console.log(addedCon);

    }, [addedCon])

    return(<>
       <div className="flex flex-col p-3 gap-1">
    <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 py-2">
        Állapot
    </h2>
    <div className="flex gap-2 text-white flex-wrap">
        {conditions.map((c, index) => (
            <div
                key={index}
                onClick={() => setAddedCond(addedCon =>
                    addedCon.includes(c.name)
                        ? addedCon.filter(a => a !== c.name)
                        : [...addedCon, c.name]
                )}
                title={c.desc}
                className={`border cursor-pointer rounded-full px-3 py-1 text-md font-medium transition-all duration-200 ${
                    addedCon.includes(c.name)
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "text-slate-400 border-slate-700/60 hover:border-green-500/30 hover:text-green-400"
                }`}
            >
                {c.name}
            </div>
        ))}
    </div>
</div>
        
    </>)
}