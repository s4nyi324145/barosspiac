import {ShieldCheck, Check, ArrowRight } from "lucide-react"
import { useAuth } from "../context/authContext"
export default function CommunitySection() {    

    const {user} = useAuth()

    return (
    <div className="bg-slate-900 border-y border-slate-800 px-8 py-12">
        <div className="max-w-5xl mx-auto flex md:flex-row flex-col items-center justify-between gap-8">

            {/* Bal oldal */}
            <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-7 h-7 text-blue-400" />
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-white text-xl font-bold">Biztonságos iskolai közösség</h2>
                    <p className="text-slate-400 text-sm">Csak <span className="text-blue-400 font-medium">@dszcbaross.edu.hu</span> emailcímmel regisztrálható platform</p>
                </div>
            </div>

            {/* Középső — pipák */}
            <div className="flex flex-col gap-2 shrink-0">
                {[
                    "Ismered az eladót — ugyanabba az iskolába jártok",
                    "Minden átadás személyesen, az iskolában",
                    "Nincs csomagküldés, nincs ismeretlen"
                ].map((text, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-green-400" />
                        </div>
                        <p className="text-slate-400 text-sm">{text}</p>
                    </div>
                ))}
            </div>

            {/* Jobb oldal — gomb */}
            {!user && (
                <a
                    href="/register"
                    className="shrink-0 flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20"
                >
                    Regisztrálj most
                    <ArrowRight className="w-4 h-4" />
                </a>
            )}

        </div>
    </div>      
    
)           
}