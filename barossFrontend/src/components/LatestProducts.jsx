import { useEffect, useState } from "react"
import api from "../config/api"
import { ArrowRight } from "lucide-react"
export default function LatestProducts() {

    const [products, setProducts] = useState([])

    const getLatestProducts = async () => {
        try {
            const result = await api.get('/product/latestProduct')
            setProducts(result.data)
        } catch (error) {
            console.log(error.response)
        }

    }

    useEffect(() => {
        getLatestProducts()
    }, [])

    useEffect(() => {
        console.log(products);
    }, [products])


    return (<>
        <div className=" pb-7 bg-slate-950 flex flex-col gap-6 flex-1">
            <h1 className="text-3xl font-medium pl-7 text-blue-500">Legújabb termékek</h1>

            <div className="overflow-hidden ">
                <div className="flex items-center  card-flow  gap-6 ">
                    {products.map(p => (
                        <div
                            key={p.product_id}
                            className={`  w-56 min-w-56 min-h-60 cursor-pointer hover:border-blue-600 bg-slate-900  border border-slate-700/60 rounded-2xl p-4  shadow-xl`}

                        >
                            <div className="w-full h-32 bg-slate-700/50 rounded-xl mb-3 flex items-center text-white justify-center text-3xl">
                                kép
                            </div>
                            <div className="flex flex-1 justify-between">
                                <div className="flex flex-col flex-1">
                                    <p className="text-white text-sm max-w-32  font-semibold truncate">{p.product_title}</p>
                                    <p className="text-slate-400 text-xs mt-0.5">{p.name}</p>
                                </div>
                                <span className="text-blue-400  text-sm font-bold">{p.product_price} Ft</span>
                            </div>
                            <div className="mt-2">
                                <span className="text-xs bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded-full">
                                    {p.product_condition}
                                </span>
                            </div>
                        </div>


                    ))}

                    {/*Dublikált kártyák*/}
                    {products.map(p => (
                        <div
                            key={p.product_id}
                            className={`  w-56 min-w-56 min-h-60 cursor-pointer bg-slate-900 hover:border-blue-600 bg-gradient-to-br border border-slate-700/60 backdrop-blur-sm rounded-2xl p-4  shadow-xl`}

                        >
                            <div className="w-full h-32 bg-slate-700/50 rounded-xl mb-3 flex items-center text-white justify-center text-3xl">
                                kép
                            </div>
                            <div className="flex flex-1 justify-between">
                                <div className="flex flex-col flex-1">
                                    <p className="text-white text-sm max-w-32  font-semibold truncate">{p.product_title}</p>
                                    <p className="text-slate-400 text-xs mt-0.5">{p.name}</p>
                                </div>
                                <span className="text-blue-400  text-sm font-bold">{p.product_price} Ft</span>
                            </div>
                            <div className="mt-2">
                                <span className="text-xs bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded-full">
                                    {p.product_condition}
                                </span>
                            </div>
                        </div>


                    ))}

                </div>
            </div>

            <div className="flex justify-center mt-4 items-center">
                <div  className="flex gap-2 items-center p-3 rounded-xl text-white bg-blue-600" >
                    <button>Összes felfedezése </button>
                    <ArrowRight /> 
                </div>
            </div>

        </div>

    </>)
}