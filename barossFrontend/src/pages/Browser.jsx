import Navbar from "../components/Navbar"
import FilterContainer from "../components/filterContainer"

export default function Browser(){


    return(<>
          
                <Navbar/>
                <div className="flex">
                    <FilterContainer/>
                </div>
          
    </>)

}