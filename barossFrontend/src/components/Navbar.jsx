
import { Search } from "lucide-react"
import RegisterButton from "./RegisterButton"

export default function Navbar() {
    return (<>

            <div className="bg-slate-900  border-b border-slate-800">
  <div className="container min-w-full  px-4 py-4 flex items-center justify-around gap-6">
    
    <div>
        <p className="text-white font-bold">Baross piac</p>
    </div>

    {/* Kereső fül */}
    <div className="flex-1 max-w-md flex items-center gap-3 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 group">
      <Search className="w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-200 shrink-0" />
      <input
        type="text"
        className="bg-transparent w-full outline-none text-sm text-slate-200 placeholder-slate-600"
        placeholder="Keresés..."
      />
    </div>

    {/* Navbar gombok */}
    <div className="flex items-center gap-6">
      <a 
        href="/login"
        className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 border border-slate-700/50 px-4 py-2 rounded-xl hover:bg-slate-800/60"
      >
        Bejelentkezés
      </a>
      <RegisterButton/>
    </div>

  </div>
</div>
    
    </>)

    }