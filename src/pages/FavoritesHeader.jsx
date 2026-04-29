
import { Trash2 } from "lucide-react";
import api from "../config/api";


export default function FavoritesHeader({ favoritesCount, showWarningModal, setShowWarningModal }) {
    //console.log(favoritesCount);

    
    

    return (
        <div className="flex flex-wrap gap-4 justify-center sm:justify-between items-center bg-slate-950 px-6 py-6 border-b border-slate-800">

            {/* Left side */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-white">Kedvenceim</h1>
                    <span className="text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded-full">
                        {favoritesCount} termék
                    </span>
                </div>
                <p className="text-slate-500 text-sm">Böngéssz a kedvelt termékeid között</p>
            </div>

            {/* Right side */}
            {favoritesCount > 0 && (
                <button
                    onClick={() => {setShowWarningModal(!showWarningModal)}}
                    className="flex items-center  justify-center gap-2 text-sm font-medium text-red-400 hover:text-white border border-red-500/30 hover:bg-red-500/20 px-4 py-2 rounded-xl transition-all duration-200"
                >
                    <Trash2 className="w-4 h-4" />
                    Összes törlése
                </button>
            )}

        </div>
    );
}