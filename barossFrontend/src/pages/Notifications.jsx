import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NotificationContainer from "../components/NotificationContainer";
import { Trash2, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import api from "../config/api";
export default function Notifications(params) {
    

  

    return(<>

        <div className="bg-slate-950 flex flex-col">
            
            <Navbar/>
            <Categories/>
            <NotificationContainer/>
            <Footer/>
        </div>
    
    </>)
}