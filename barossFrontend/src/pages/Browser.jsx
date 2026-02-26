import { useState } from "react"
import Navbar from "../components/Navbar"
import FilterContainer from "../components/filterContainer"

export default function Browser(){

    const [filter,setFilter] = useState({
        category: null,
        subcategory: null,
        item: null,
        priceMin: null,
        priceMax: null,
        condition: null,
        userClass: null,
        size: null
    })

    return(<>
          
                <Navbar/>
                <div className="flex">
                    <FilterContainer filter={filter} setFilter={setFilter}/>
                </div>
          
    </>)

}