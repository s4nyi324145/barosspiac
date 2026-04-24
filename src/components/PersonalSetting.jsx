import { useEffect, useState } from "react"
import { useAuth } from "../context/authContext"
import api from "../config/api"
import { useToast } from "../context/toastContext"
import { Upload, Trash2, User, GraduationCap, Mail, Save, X } from "lucide-react"
export default function PersonalSetting() {

    const { user, loading, setUser } = useAuth()
    if (!user) return null

    console.log(user?.fullname);
    const [newFullname, setNewFullName] = useState("")
    const [newClass, setNewClass] = useState("")
    const [profileUploadModal, setProfileUploadModal] = useState(false)
    const [profilePic, setProfilePic] = useState("")
    const [uploadLoading, setUploadLoading] = useState(false)
    const { showSuccess, showError } = useToast()

    useEffect(() => {

        setNewFullName(user?.fullname)
        setNewClass(user?.userClass)


    }, [user])

    //useEffect(() => {console.log(newFullname)}, [newFullname])

    const handleSubmit = async () => {
        try {
            const result = await api.post('/user/user', {
                fullname: newFullname,
                userClass: newClass
            })
            setUser(prev => ({ ...prev, fullname: newFullname, userClass: newClass }))
            //console.log(result)
            showSuccess("Adat(ok) sikeresen módosítva")

        } catch (error) {
            showError(error.response?.data?.message)
        }
    }

    const profilePicUpload = async () => {
        setUploadLoading(true)
        try {

            const formData = new FormData()
            formData.append('profilePic', profilePic)
            const result = await api.post('/user/profile_pic', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            setUser(prev => ({ ...prev, pfp: result.data.newPfp }))
            showSuccess("Profilkép sikeresen frissítve")
            setProfileUploadModal(false)
            setUploadLoading(false)
            console.log(result)

        } catch (error) {
            console.log(error);
            showError(error.response?.data?.message || "Hiba történt a feltöltés során")
            setUploadLoading(false)

        }
        setProfileUploadModal(false)
    }

    const deleteProfilePic = async () => {
        try {
            const result = await api.delete('/user/profile_pic')
            console.log(result);

            setUser(prev => ({ ...prev, pfp: "" }))
            showSuccess("Profilkép sikeresen törölve")
            console.log(result)
        } catch (error) {
            console.log(error)
            showError(error.response?.data?.message || "Hiba történt a törlés során")
        }
    }


    return (<>

        {profileUploadModal && (
            <div
                onClick={() => setProfileUploadModal(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-slate-900 border border-slate-700/60 rounded-2xl p-6 w-full max-w-sm flex flex-col gap-5 shadow-2xl"
                    style={{ animation: 'scaleIn 0.15s ease-out' }}
                >
                    {/* Fejléc */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-white font-bold">Profilkép feltöltése</h2>
                            <p className="text-slate-500 text-xs">JPG vagy PNG, maximum 2MB</p>
                        </div>
                        <button
                            onClick={() => setProfileUploadModal(false)}
                            className="text-slate-500 hover:text-white transition-colors duration-200"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Előnézet ha van kép */}
                    {profilePic && (
                        <div className="flex items-center gap-4 bg-slate-800/50 border border-slate-700/50 rounded-xl p-3">
                            <img
                                src={URL.createObjectURL(profilePic)}
                                className="w-14 h-14 rounded-xl object-cover shrink-0"
                            />
                            <div className="flex flex-col gap-0.5 min-w-0">
                                <p className="text-white text-sm font-medium truncate">{profilePic.name}</p>
                                <p className="text-slate-500 text-xs">{(profilePic.size / 1024).toFixed(0)} KB</p>
                            </div>
                        </div>
                    )}

                    {/* File input */}
                    <input
                        type="file"
                        onChange={(e) => setProfilePic(e.target.files[0])}
                        accept=".jpg,.jpeg,.png"
                        className="w-full text-sm text-slate-400 file:bg-slate-800 file:text-white file:px-4 file:py-2 file:rounded-xl file:border file:border-slate-700/60 file:cursor-pointer hover:file:bg-slate-700 file:transition-all file:duration-200"
                    />

                    {/* Gombok */}
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => profilePicUpload()}
                            disabled={!profilePic || uploadLoading}
                            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${profilePic && !uploadLoading
                                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                }`}
                        >
                            {uploadLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Feltöltés...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4" />
                                    Feltöltés
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => setProfileUploadModal(false)}
                            disabled={uploadLoading}
                            className="w-full py-2.5 rounded-xl border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium transition-all duration-200"
                        >
                            Mégse
                        </button>
                    </div>

                </div>
            </div>
        )}

        <div className="flex flex-col flex-1 p-8 text-white gap-8">



            {/* Fejléc */}
            <div className="border-b border-slate-800 pb-5">
                <h1 className="text-xl font-bold text-white">Személyes adatok</h1>
                <p className="text-slate-500 text-sm mt-1">Módosítsd a profilképed és a személyes adataidat</p>
            </div>

            {/* Profilkép szekció */}
            <div className="flex items-center flex-col sm:flex-row gap-6 bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-3xl shrink-0 shadow-lg shadow-blue-500/20">
                    {user.pfp ? <img src={user.pfp} alt="Profilkép" className="w-full h-full object-cover rounded-2xl" /> : user.fullname?.[0].toUpperCase()}
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-center sm:text-left text-white">Profilkép</p>
                    <p className="text-slate-500 text-center sm:text-left text-xs">JPG vagy PNG, maximum 2MB</p>
                    <div className="flex flex-col  sm:flex-row gap-2 mt-1">
                        <button onClick={() => setProfileUploadModal(true)} className="flex items-center justify-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-xl transition-all duration-200">
                            <Upload className="w-3.5 h-3.5" /> Feltöltés
                        </button>
                        <button onClick={() => deleteProfilePic()} className="flex items-center justify-center gap-2 text-sm font-medium text-red-400 hover:text-white border border-red-500/30 hover:bg-red-500/20 px-3 py-1.5 rounded-xl transition-all duration-200">
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
                            value={newFullname || ""}
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
                            <option value="13a">13/A</option>
                            <option value="13b">13/B</option>
                            <option value="13c">13/C</option>
                            <option value="12a">12/A</option>
                            <option value="12b">12/B</option>
                            <option value="12c">12/C</option>
                            <option value="11a">11/A</option>
                            <option value="11b">11/B</option>
                            <option value="11c">11/c</option>
                            <option value="10a">10/A</option>
                            <option value="10b">10/B</option>
                            <option value="10c">10/C</option>
                            <option value="9a">9/A</option>
                            <option value="9b">9/B</option>
                            <option value="9c">9/C</option>
                            <option value="tanar">Tanár</option>
                        </select>
                    </div>
                </div>

                {/* Email — nem szerkeszthető */}
                <div className="flex flex-col  gap-1.5">
                    <label className="text-sm font-medium text-slate-300">Email-cím</label>
                    <div className="flex items-center text-center sm:text-left gap-3 flex-wrap  bg-slate-800/30 border border-slate-700/40 rounded-xl px-4 py-2.5 opacity-60 cursor-not-allowed">
                        <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                        <p className="text-sm flex-1 text-slate-400">{user.email}</p>
                        <span className="text-center flex-1 sm:max-w-fit sm:ml-auto text-xs text-slate-600 bg-red-700/50  px-2 py-0.5 rounded-full">Nem módosítható</span>
                    </div>
                </div>

            </div>

            {/* Mentés */}
            <div className="flex justify-center md:justify-end">
                <button disabled={!newFullname || newClass === ""} onClick={() => handleSubmit()} className={`flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20 ${!newFullname || newClass === "" ? "opacity-50 cursor-not-allowed" : ""}`}>
                    <Save className="w-4 h-4" />
                    Változtatások mentése
                </button>
            </div>

        </div>
    </>)
}