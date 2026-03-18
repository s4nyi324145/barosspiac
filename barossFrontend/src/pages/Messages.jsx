import Navbar from "../components/Navbar";
import Conversations from "../components/Conversations";
export default function Messages(){

    return(<>
        <div className="min-h-screen bg-slate-950 text-white">
                <Navbar/>
                <div className="flex flex-1">
                    <Conversations/>
                </div>
        </div>
    
    </>)
}