import { useState } from "react"
import Navbar from "../components/Navbar"
import FilterContainer from "../components/filterContainer"
import BrowserSite from "../components/BrowserSite"

export default function Browser(){

    const [filter,setFilter] = useState({
        category: null,
        subcategory: null,
        item: null,
        priceMin: null,
        priceMax: null,
        condition: [],
        subject: null,
        size: []
    })

    
    

    return(<>
          
                <Navbar/>
                <div className="flex">
                    <FilterContainer filter={filter} setFilter={setFilter}/>
                    <BrowserSite filter={filter} setFilter={setFilter}/>
                </div>
          
    </>)

}