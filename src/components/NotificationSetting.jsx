import { Mail,Star,Tag,Save } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "../context/authContext"
import api from "../config/api"
import { useToast } from "../context/toastContext"
export default function NotificationSetting(){

    const {user} = useAuth()
    const {showSuccess} = useToast()
    const [notifications, setNotifications] = useState({
        newMessage: user.notify_message,
        newRating: user.notify_rating,
        productSold: user.notify_sold,
    })


    //useEffect(() => {console.log(notifications)},[notifications])

    
    const toggle = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const handleNotChange = async() =>{
        try {
            const result = await api.put('/user/notification',{
                notify_message: notifications.newMessage,
                notify_rating: notifications.newRating,
                notify_sold: notifications.productSold
            })

            showSuccess("Változtatások sikeresen elmentve")


        } catch (error) {
            console.log(error)
        }
    }

    return(<>
        <div className="flex flex-col flex-1 p-8 text-white gap-8">

{/* Fejléc */}
<div className="border-b border-slate-800 pb-5">
    <h1 className="text-xl font-bold text-white">Értesítések</h1>
    <p className="text-slate-500 text-sm mt-1">Állítsd be milyen email értesítéseket szeretnél kapni</p>
</div>

<div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 flex flex-col gap-1">
    {[
        { key: 'newMessage', icon: Mail, label: 'Új üzenet', desc: 'Értesítés ha valaki üzenetet küld neked' },
        { key: 'newRating', icon: Star, label: 'Új értékelés', desc: 'Értesítés ha valaki értékel téged' },
        { key: 'productSold', icon: Tag, label: 'Termék eladva', desc: 'Értesítés ha valaki megveszi a hirdetésed' },
    ].map((item, index, arr) => (
        <div key={item.key} className={`flex items-center justify-between py-4 ${index !== arr.length - 1 ? 'border-b border-slate-700/40' : ''}`}>
            <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-slate-700/60 border border-slate-600/50 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-slate-400" />
                </div>
                <div className="flex flex-col gap-0.5">
                    <p className="text-white text-sm font-medium">{item.label}</p>
                    <p className="text-slate-500 text-xs">{item.desc}</p>
                </div>
            </div>

            {/* Toggle */}
            <button
                onClick={() => toggle(item.key)}
                className={`w-11 h-6 rounded-full transition-all duration-200 relative shrink-0 ${
                    notifications[item.key] ? 'bg-blue-600' : 'bg-slate-700'
                }`}
            >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                    notifications[item.key] ? 'left-6' : 'left-1'
                }`} />
            </button>
        </div>
    ))}
</div>

{/* Mentés */}
<div className="flex justify-end">
    <button onClick={() => handleNotChange()} className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20">
        <Save className="w-4 h-4" />
        Változtatások mentése
    </button>
</div>

</div>
    
    </>)
}