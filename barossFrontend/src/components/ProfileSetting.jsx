import { Trash2, Calendar1, User, ShieldCheck, X, Lock } from "lucide-react"
import api from "../config/api"
import { useState } from "react"
import { useAuth } from "../context/authContext.jsx"
import { useNavigate } from "react-router-dom"
import { useToast } from "../context/toastContext.jsx"
export default function ProfileSetting() {

    const { user } = useAuth()
    const {showError} = useToast()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deletePassword, setDeletePassword] = useState('')
    const navigate = useNavigate()

    const handleDeleteAccount = async () => {
        
            try {
                const result = await api.delete(`/user/delete?psw=${deletePassword}`,{
                    psw: deletePassword
                })
                navigate('/register')
                

            } catch (error) {
                showError(error.response.data.message)
            }
  

    }

    return (<>
        <div className="flex flex-col flex-1 p-8 text-white gap-8">

            {/* Fejléc */}
            <div className="border-b border-slate-800 pb-5">
                <h1 className="text-xl font-bold text-white">Fiók</h1>
                <p className="text-slate-500 text-sm mt-1">Fiókod adatai és beállításai</p>
            </div>

            {/* Fiók információk */}
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 flex flex-col gap-4">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Fiók információk</p>

                {[
                    {
                        icon: Calendar1,
                        label: 'Regisztráció dátuma',
                        value: new Date(user.created_at).toLocaleDateString('hu-HU')
                    },
                    {
                        icon: User,
                        label: 'Fiók szerepköre',
                        value: user.role === "regisztralt" ? "Regisztrált felhasználó" : "Adminisztrátor"
                    },
                ].map((item, i, arr) => (
                    <div key={i} className={`flex items-center gap-4 ${i !== arr.length - 1 ? 'pb-4 border-b border-slate-700/40' : ''}`}>
                        <div className="w-9 h-9 rounded-xl bg-slate-700/60 border border-slate-600/50 flex items-center justify-center shrink-0">
                            <item.icon className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-white text-sm font-medium">{item.label}</p>
                            <p className="text-slate-500 text-xs">{item.value}</p>
                        </div>
                    </div>
                ))}

                {/* Verified */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-700/40">
                    <div className="w-9 h-9 rounded-xl bg-slate-700/60 border border-slate-600/50 flex items-center justify-center shrink-0">
                        <ShieldCheck className={`w-4 h-4 ${user.verified ? 'text-green-400' : 'text-red-400'}`} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <p className="text-white text-sm font-medium">Fiók megerősítés</p>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit ${user.verified
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                            {user.verified ? 'Megerősítve' : 'Nincs megerősítve'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Veszélyes zóna */}
            <div className="bg-red-500/5 border border-red-500/30 rounded-2xl p-6 flex flex-col gap-4">
                <p className="text-xs text-red-400 uppercase tracking-wider">Veszélyes zóna</p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0">
                            <Trash2 className="w-4 h-4 text-red-400" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-white text-sm font-medium">Fiók törlése</p>
                            <p className="text-slate-500 text-xs">Minden hirdetésed, üzeneted és értékelésed törlődik.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="shrink-0 flex items-center gap-2 text-sm font-medium text-red-400 hover:text-white border border-red-500/30 hover:bg-red-600 px-4 py-2 rounded-xl transition-all duration-200"
                    >
                        <Trash2 className="w-4 h-4" />
                        Törlés
                    </button>
                </div>
            </div>

            {/* Törlés modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10 p-4">
                    <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-6 w-full max-w-md flex flex-col gap-5 shadow-2xl">

                        {/* Fejléc */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0">
                                <Trash2 className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                                <h2 className="text-white font-bold">Fiók törlése</h2>
                                <p className="text-slate-500 text-xs">Ez a művelet nem visszavonható</p>
                            </div>
                        </div>

                        {/* Mi törlődik */}
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex flex-col gap-2">
                            <p className="text-red-400 text-xs font-medium">Az alábbiak véglegesen törlődnek:</p>
                            {['Összes hirdetésed', 'Összes üzeneted', 'Összes értékelésed', 'Kedvenceid'].map(item => (
                                <div key={item} className="flex items-center gap-2 text-slate-400 text-xs">
                                    <X className="w-3 h-3 text-red-400 shrink-0" />
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* Jelszó megerősítés */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-300">Írd be a jelszavad a megerősítéshez</label>
                            <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20 transition-all duration-200">
                                <Lock className="w-4 h-4 text-slate-500 shrink-0" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={deletePassword}
                                    onChange={(e) => setDeletePassword(e.target.value)}
                                    className="bg-transparent flex-1 outline-none text-sm text-slate-200 placeholder-slate-600"
                                />
                            </div>
                        </div>

                        {/* Gombok */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => { setShowDeleteModal(false); setDeletePassword('') }}
                                className="flex-1 py-2.5 rounded-xl border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium transition-all duration-200"
                            >
                                Mégse
                            </button>
                            <button
                                disabled={!deletePassword}
                                onClick={() => handleDeleteAccount()}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${deletePassword
                                        ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20'
                                        : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                    }`}
                            >
                                Végleges törlés
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    </>)
}