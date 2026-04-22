import { useAuth } from "../context/authContext"
import { Link } from "react-router-dom"
import { MapPin, ExternalLink } from "lucide-react"

export default function Footer(){

    const {user} = useAuth()

   return (
    <footer className="bg-slate-900 border-t border-slate-800">

    {/* Fő tartalom */}
    <div className="md:max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-start gap-10">

        {/* Bal — Logo + leírás */}
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="text-white font-bold">BarossPiac</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
                Iskolai piactér kizárólag a{' '}
                <a href="https://www.dszcbaross.hu/" className="text-blue-400 hover:text-blue-300 transition-colors">
                    DSZC Baross Gábor Technikum
                </a>{' '}
                diákjainak.
            </p>
            <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-full w-fit">
                @dszcbaross.edu.hu
            </span>
        </div>

        {/* Közép — Navigáció */}
        <div className="flex flex-col gap-3">
            <p className="text-white text-sm font-semibold mb-1">Navigáció</p>
            <a href="/" className="text-slate-500 hover:text-white transition-colors text-sm">Főoldal</a>
            <a href="/browser" className="text-slate-500 hover:text-white transition-colors text-sm">Böngészés</a>
            {!user ? (
                <>
                    <a href="/register" className="text-slate-500 hover:text-white transition-colors text-sm">Regisztráció</a>
                    <a href="/login" className="text-slate-500 hover:text-white transition-colors text-sm">Bejelentkezés</a>
                </>
            ) : (
                <>
                    <a href="/upload" className="text-slate-500 hover:text-white transition-colors text-sm">Hirdetés feladása</a>
                    <Link to={`/profile/${user.user_id}`} className="text-slate-500 hover:text-white transition-colors text-sm">Profil</Link>
                </>
            )}
        </div>

        {/* Jobb — Kapcsolat */}
        <div className="flex flex-col gap-3">
            <p className="text-white text-sm font-semibold mb-1">Az iskola</p>
            <div className="flex items-start gap-2 text-slate-500 text-xs">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-600" />
                <div className="flex flex-col gap-0.5">
                    <p className="text-slate-400">Debreceni SZC Baross Gábor Technikum, Szakképző Iskola és Kollégium</p>
                    <p>4030 Debrecen, Budai Ézsaiás u. 8/A.</p>
                </div>
            </div>
            <a
                href="https://www.dszcbaross.hu/"
                target="_blank"
                className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors text-xs w-fit"
            >
                <ExternalLink className="w-3 h-3" />
                dszcbaross.hu
            </a>
        </div>

    </div>

    {/* Alsó sáv */}
    <div className="border-t border-slate-800 px-8 py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-slate-600 text-xs">© {new Date().getFullYear()} BarossPiac. Minden jog fenntartva.</p>
            <div className="flex gap-4">
                <a href="/aszf" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">ÁSZF</a>
                <a href="/adatkezeles" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">Adatkezelési tájékoztató</a>
            </div>
        </div>
    </div>

</footer>
)

}