
import { useEffect, useState } from "react"
import FilterCategories from "./filterCategories";
import FilterPrice from "./FilterPrice";
import FilterConditions from "./FilterConditions";
import FilterSize from "./FilterSize";
import FilterClass from "./FilterClass";

export default function FilterContainer({filter,setFilter}) {



    

    useEffect(() =>{ console.log(filter);}, [filter])

    return (<>
        <div className="bg-slate-900 border-r border-slate-800 w-52 min-w-52 min-h-screen">
            <FilterCategories filter={filter} setFilter={setFilter}/>
            <FilterPrice/>
            <FilterConditions filter={filter} setFilter={setFilter}/>
            <FilterSize/>
            <FilterClass/>
        </div>

    </>)
}