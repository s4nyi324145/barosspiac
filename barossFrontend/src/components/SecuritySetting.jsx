import { useState } from "react"
import { Eye, EyeOff, Save, Lock } from "lucide-react"
import api from "../config/api"
import { useToast } from "../context/toastContext"
export default function SecuritySetting() {

    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [currentPsw, setCurrentPsw] = useState("")
    const [passwordStrength, setPasswordStrength] = useState(0)
    const {showSuccess, showError} = useToast()

    const passwordValidation = (password) => {
        let passwordStrength = 0
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
       const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/']/ .test(password);
    
        if (password.length >= minLength) passwordStrength++;
        if (hasUpperCase) passwordStrength++;
        if (hasLowerCase) passwordStrength++;
        if (hasNumber) passwordStrength++;
        if (hasSpecialChar) passwordStrength++;
    
        return passwordStrength;
    
      }
    const passwordChanged = (e) => {
        setNewPassword(e.target.value);
        setPasswordStrength(passwordValidation(e.target.value));
      }
    
      const handlePswChange = async() => {
        try {
            const result = await api.post('/user/password',{
                password: currentPsw,
                newPsw: newPassword
            })
            showSuccess(result.data?.message)
        } catch (error) {
            showError(error.response.data.message)
        }
      }

    return (<>
        <div className="flex flex-col flex-1 p-8 text-white gap-8">

            {/* Fejléc */}
            <div className="border-b border-slate-800 pb-5">
                <h1 className="text-xl font-bold text-white">Biztonság</h1>
                <p className="text-slate-500 text-sm mt-1">Kezeld a jelszavad és a fiókod biztonságát</p>
            </div>

            {/* Jelszó módosítás */}
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 flex flex-col gap-5">

                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-white font-semibold text-sm">Jelszó módosítása</p>
                        <p className="text-slate-500 text-xs">Minimum 8 karakter</p>
                    </div>
                </div>

                {/* Jelenlegi jelszó */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-300">Jelenlegi jelszó</label>
                    <div className="flex items-center gap-3 flex-1 justify-between bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
                        <div className="flex flex-1 items-center gap-3">
                            <Lock className="w-4 h-4 text-slate-500 shrink-0" />
                            {showCurrent ?
                                <div className="flex flex-1">
                                    <input
                                        type={"text"}
                                        placeholder="Jelenlegi jelszó"
                                        value={currentPsw}
                                        onChange={(e) => setCurrentPsw(e.target.value)}
                                        className="bg-transparent flex-1 outline-none text-sm text-slate-200 placeholder-slate-600"
                                    />

                                </div> :
                                <div className="flex flex-1">
                                    <input
                                        type={"password"}
                                        value={currentPsw}
                                        onChange={(e) => setCurrentPsw(e.target.value)}
                                        placeholder="••••••••"
                                        className="bg-transparent flex-1 outline-none text-sm text-slate-200 placeholder-slate-600"
                                    />


                                </div>

                            }
                        </div>
                        <button onClick={() => setShowCurrent(!showCurrent)} className="text-slate-500 hover:text-white transition-colors duration-200">
                            {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Új jelszó */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-300">Új jelszó</label>
                    <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
                        <div className="flex flex-1 items-center gap-3">
                            <Lock className="w-4 h-4 text-slate-500 shrink-0" />
                            {showNew ?
                                <div className="flex flex-1">
                                    <input
                                        type={"text"}
                                        placeholder="Jelenlegi jelszó"
                                        value={newPassword}
                                        onChange={(e) => passwordChanged(e)}
                                        className="bg-transparent flex-1 outline-none text-sm text-slate-200 placeholder-slate-600"
                                    />

                                </div> :
                                <div className="flex flex-1">
                                    <input
                                        type={"password"}
                                        value={newPassword}
                                        onChange={(e) => passwordChanged(e)}
                                        placeholder="••••••••"
                                        className="bg-transparent flex-1 outline-none text-sm text-slate-200 placeholder-slate-600"
                                    />


                                </div>

                            }
                        </div>
                        <button onClick={() => setShowNew(!showNew)} className="text-slate-500 hover:text-white transition-colors duration-200">
                            {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Erősség jelző */}
                    {newPassword && (
                        <div className="flex flex-col gap-1.5 mt-1">
                            <div className="flex gap-1">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={`h-1 flex-[0.1] rounded-full transition-all duration-300 ${i <= passwordStrength
                                        ? passwordStrength === 1 ? 'bg-red-500'
                                            : passwordStrength === 2 ? 'bg-yellow-500'
                                                : 'bg-green-500'
                                        : 'bg-slate-700'
                                        }`} />
                                ))}
                            </div>
                            <p className={`text-xs ${passwordStrength === 1 ? 'text-red-400' :
                                passwordStrength === 2 ? 'text-yellow-400' :
                                    'text-green-400'
                                }`}>
                                {passwordStrength === 1 ? 'Gyenge jelszó' :
                                    passwordStrength === 2 ? 'Közepes jelszó' :
                                        'Erős jelszó'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Megerősítés */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-300">Új jelszó megerősítése</label>
                    <div className={`flex items-center gap-3 bg-slate-800/60 border rounded-xl px-4 py-2.5 focus-within:ring-2 transition-all duration-200 ${confirmPassword && confirmPassword !== newPassword
                        ? 'border-red-500/60 focus-within:ring-red-500/20'
                        : 'border-slate-700/60 focus-within:border-blue-500 focus-within:ring-blue-500/20'
                        }`}>
                        <div className="flex flex-1 items-center gap-3">
                            <Lock className="w-4 h-4 text-slate-500 shrink-0" />
                            {showConfirm ?
                                <div className="flex flex-1">
                                    <input
                                        type={"text"}
                                        placeholder="Jelenlegi jelszó"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="bg-transparent flex-1 outline-none text-sm text-slate-200 placeholder-slate-600"
                                    />

                                </div> :
                                <div className="flex flex-1">
                                    <input
                                        type={"password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="bg-transparent flex-1 outline-none text-sm text-slate-200 placeholder-slate-600"
                                    />


                                </div>

                            }
                        </div>
                        <button onClick={() => setShowConfirm(!showConfirm)} className="text-slate-500 hover:text-white transition-colors duration-200">
                            {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {confirmPassword && confirmPassword !== newPassword && (
                        <p className="text-xs text-red-400">A két jelszó nem egyezik</p>
                    )}
                </div>

                {/* Mentés */}
                <div className="flex justify-end">
                    <button
                    onClick={() => handlePswChange()}
                        disabled={!newPassword || newPassword !== confirmPassword && passwordStrength < 3 && newPassword.length < 8}
                        className={`flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 ${newPassword && newPassword === confirmPassword
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                            : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                            }`}
                    >
                        <Save className="w-4 h-4" />
                        Jelszó módosítása
                    </button>
                </div>
            </div>

        </div>

    </>)
}