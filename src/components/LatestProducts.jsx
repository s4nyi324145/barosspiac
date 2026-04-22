import { useEffect, useState } from "react"
import api from "../config/api"
import { ArrowRight } from "lucide-react"
import ProductCard from "./ProductCard"
import { useNavigate } from "react-router-dom"
export default function LatestProducts({products}) {


    const navigate = useNavigate()

    

    useEffect(() => {
        //console.log(products);
    }, [products])


    return (<>
        <div className=" pb-7 mt-4   bg-slate-950 flex flex-col gap-6 flex-1">
            <h1 className="text-3xl font-medium lg:pl-7 pl-0 text-center lg:text-left text-blue-500">Legújabb termékek</h1>

            <div className="overflow-hidden">
                <div className="flex items-center flex-nowrap card-flow p-5 gap-6">
                    {[...products,...products ,...products].map((p, i) => (
                        <div key={i} className="min-w-60 w-60">
                            <ProductCard p={p} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center mt-4 items-center">
                <div onClick={() => navigate("/browser")} className="flex gap-2 items-center p-3 rounded-xl text-white bg-blue-600" >
                    <button >Összes felfedezése </button>
                    <ArrowRight />
                </div>
            </div>

        </div>

    </>)
}