import { useEffect, useEffectEvent, useState } from "react";
import { ChevronDown } from "lucide-react"
import api from '../config/api.js'
export default function FilterCategories({filter,setFilter}) {

    const [categories, setCategories] = useState([])
    const [openCategory, setOpenCategory] = useState(null);
    const [openSubcategory, setOpenSubcategory] = useState(null);
    const [selectedItem, setSelectedItem] = useState("")

    const getCategories = async () => {
        try {

            const response = await api.get('/category/getCategory')
            setCategories(response.data)
            


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {getCategories()},[])
    
    useEffect(() =>{
        console.log(categories);
    }, [categories])



    useEffect(() =>{
        setFilter((filter) => ({
            ...filter,
            category: openCategory,
            subcategory: openSubcategory,
            item: selectedItem
          }));
    }, [openCategory,openSubcategory,selectedItem])

    return (<>
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
                                                    key={item.name}
                                                    onClick={() => setSelectedItem(item.name)}
                                                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:text-blue-400 hover:bg-slate-800/40 transition-all duration-200"
                                                >
                                                    {item.name}
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

    </>)
}