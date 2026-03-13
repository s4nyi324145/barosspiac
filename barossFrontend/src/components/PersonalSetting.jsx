import { useEffect, useState } from "react"
import { useAuth } from "../context/authContext"
import api from "../config/api"
import { useToast } from "../context/toastContext"
import { Upload, Trash2, User, GraduationCap, Mail, Save } from "lucide-react"
export default function PersonalSetting() {

    const { user } = useAuth()
    const [newFullname, setNewFullName] = useState("")
    const [newClass, setNewClass] = useState("")
    const {showSuccess, showError} = useToast()

    //useEffect(() => {console.log(newFullname)}, [newFullname])

    const handleSubmit = async () => {
        try {
            const result = await api.post('/user/user',{
                fullname: newFullname,
                userClass: newClass
            })
            console.log(result)
            showSuccess("Adat(ok) sikeresen módosítva")
            
        } catch (error) {
            showError(error.response?.data?.message)
        }
    }


    return (<>
        <div className="flex flex-col flex-1 p-8 text-white gap-8">

            {/* Fejléc */}
            <div className="border-b border-slate-800 pb-5">
                <h1 className="text-xl font-bold text-white">Személyes adatok</h1>
                <p className="text-slate-500 text-sm mt-1">Módosítsd a profilképed és a személyes adataidat</p>
            </div>

            {/* Profilkép szekció */}
            <div className="flex items-center  gap-6 bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-3xl shrink-0 shadow-lg shadow-blue-500/20">
                    {user.fullname?.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-white">Profilkép</p>
                    <p className="text-slate-500 text-xs">JPG vagy PNG, maximum 2MB</p>
                    <div className="flex gap-2 mt-1">
                        <button className="flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-xl transition-all duration-200">
                            <Upload className="w-3.5 h-3.5" /> Feltöltés
                        </button>
                        <button className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-white border border-red-500/30 hover:bg-red-500/20 px-3 py-1.5 rounded-xl transition-all duration-200">
                            <Trash2 className="w-3.5 h-3.5" /> Törlés
                        </button>
                    </div>
                </div>
            </div>

            {/* Adatok szekció */}
            <div className="flex flex-col gap-4">

                {/* Teljes név */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-300">Teljes név</label>
                    <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
                        <User className="w-4 h-4 text-slate-500 shrink-0" />
                        <input
                            type="text"

                            value={newFullname == "" ? user.fullname : newFullname}
                            onChange={(e) => setNewFullName(e.target.value)}
                            className="bg-transparent flex-1 outline-none text-sm text-slate-200 placeholder-slate-600"
                        />
                    </div>
                </div>

                {/* Osztály */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-300">Osztály</label>
                    <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
                        <GraduationCap className="w-4 h-4 text-slate-500 shrink-0" />
                        <select value={newClass == "" ? user.userClass : newClass} onChange={(e) => setNewClass(e.target.value)} className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-2 py-2 text-sm text-slate-200 outline-none focus:border-blue-500 focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 appearance-none cursor-pointer">
                            <option value="12a">12/A</option>
                            <option value="12b">12/B</option>
                            <option value="11a">11/A</option>
                            <option value="11b">11/B</option>
                            <option value="10a">10/A</option>
                            <option value="10b">10/B</option>
                            <option value="9a">9/A</option>
                            <option value="9b">9/B</option>
                        </select>
                    </div>
                </div>

                {/* Email — nem szerkeszthető */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-300">Email-cím</label>
                    <div className="flex items-center gap-3 bg-slate-800/30 border border-slate-700/40 rounded-xl px-4 py-2.5 opacity-60 cursor-not-allowed">
                        <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                        <p className="text-sm text-slate-400">{user.email}</p>
                        <span className="ml-auto text-xs text-slate-600 bg-red-700/50 px-2 py-0.5 rounded-full">Nem módosítható</span>
                    </div>
                </div>

            </div>

            {/* Mentés */}
            <div className="flex justify-end">
                <button onClick={() => handleSubmit()} className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20">
                    <Save className="w-4 h-4" />
                    Változtatások mentése
                </button>
            </div>

        </div>
    </>)
}