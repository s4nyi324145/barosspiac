import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function FilterContainer() {

    const [openCategory, setOpenCategory] = useState(null);
    const [openSubcategory, setOpenSubcategory] = useState(null);

    const categories = [
        {
            name: "Női",
            subcategories: [
                { name: "Alap ruhadarabok", items: ["Pólók", "Pulcsik", "Farmer", "Kabátok"] },
                { name: "Cipők", items: ["Sportcipők", "Bakancsok", "Tornacipők"] },
                { name: "Kiegészítők", items: ["Sapkák", "Táskák", "Övek", "Ékszerek"] },
                { name: "Alkalmi ruhák", items: ["Szalagavatóra", "Ballagásra", "Bulikra"] },
            ],
        },
        {
            name: "Férfi",
            subcategories: [
                { name: "Alap ruhadarabok", items: ["Pólók", "Pulcsik", "Farmer", "Kabátok"] },
                { name: "Cipők", items: ["Sportcipők", "Bakancsok", "Tornacipők"] },
                { name: "Kiegészítők", items: ["Sapkák", "Táskák", "Övek"] },
                { name: "Alkalmi ruhák", items: ["Ballagásra", "Bulikra"] },
            ],
        },
        {
            name: "Iskolai felszerelés",
            subcategories: [
                { name: "Könyvek & jegyzetek", items: ["Tankönyvek", "Munkafüzetek", "Saját jegyzetek"] },
                { name: "Írószerek", items: ["Tollak", "Ceruzák", "Markerek"] },
                { name: "Táskák & tolltartók", items: ["Hátizsákok", "Oldaltáskák", "Tolltartók"] },
                { name: "Egyéb", items: ["Vonalzók", "Körzők", "Számológépek"] },
            ],
        },
        {
            name: "Elektronika",
            subcategories: [
                { name: "Számítástechnika", items: ["Laptopok", "Egerek", "Billentyűzetek", "Fejhallgatók"] },
                { name: "Telefonok", items: ["Okostelefonok", "Tokok", "Töltők"] },
                { name: "Játék", items: ["Konzolok", "Játékok", "Kontrollerek"] },
                { name: "Egyéb", items: ["Hangszórók", "Kábelek"] },
            ],
        },
        {
            name: "Szórakozás",
            subcategories: [
                { name: "Játékok", items: ["Társasjátékok", "Kártyajátékok", "Puzzle"] },
                { name: "Sport", items: ["Labdák", "Ütők", "Védőfelszerelés"] },
                { name: "Zene", items: ["Hangszerek", "Kották"] },
                { name: "Könyvek", items: ["Regények", "Képregények", "Magazinok"] },
            ],
        },
        {
            name: "Egyéb",
            subcategories: [
                { name: "Lakberendezés", items: ["Poszterek", "Lámpák", "Dekorációk"] },
                { name: "Élelmiszer", items: ["Házi készítésű finomságok"] },
                { name: "Szolgáltatások", items: ["Korrepetálás", "Fotózás"] },
                { name: "Minden más", items: ["Egyéb"] },
            ],
        },
    ];

    return (<>
        <div className="bg-slate-900 border-r border-slate-800 w-52 min-w-52 min-h-screen">
            <div className="flex flex-col p-3 gap-1">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 py-2">
                    Kategóriák
                </h2>

                {categories.map((category) => (
                    <div key={category.name}>

                        {/* Főkategória */}
                        <button
                            onClick={() => {
                                setOpenCategory(openCategory === category.name ? null : category.name);
                                setOpenSubcategory(null);
                            }}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 group"
                        >
                            <span>{category.name}</span>
                            <ChevronDown
                                className={`w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-all duration-200 ${openCategory === category.name ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {/* Alkategóriák */}
                        {openCategory === category.name && (
                            <div className="ml-2 border-l border-slate-700/60 pl-2 flex flex-col gap-0.5 mt-0.5 mb-1">
                                {category.subcategories.map((subcategory) => (
                                    <div key={subcategory.name}>

                                        {/* Alkategória */}
                                        <button
                                            onClick={() =>
                                                setOpenSubcategory(
                                                    openSubcategory === subcategory.name ? null : subcategory.name
                                                )
                                            }
                                            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all duration-200 group"
                                        >
                                            <span>{subcategory.name}</span>
                                            <ChevronDown
                                                className={`w-3 h-3 text-slate-600 group-hover:text-slate-400 transition-all duration-200 ${openSubcategory === subcategory.name ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {/* Itemek */}
                                        {openSubcategory === subcategory.name && (
                                            <div className="ml-2 border-l border-slate-700/40 pl-2 flex flex-col gap-0.5 mt-0.5 mb-1">
                                                {subcategory.items.map((item) => (
                                                    <button
                                                        key={item}
                                                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:text-blue-400 hover:bg-slate-800/40 transition-all duration-200"
                                                    >
                                                        {item}
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                ))}
            </div>
            <div className="flex flex-col p-3 gap-1">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 py-2">
                    Ár
                </h2>                           
            </div>
            <div className="flex flex-col p-3 gap-1">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 py-2">
                    Állapot
                </h2>
                <div>
                    
                </div>                           
            </div>
        </div>

    </>)
}