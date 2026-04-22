import { Star, Mail, Flag } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../config/api"
export default function ProfileHeader({ owner, user, openReportModal, setOpenReportModal }) {

    const navigate = useNavigate()

    const [userActive, setUserActive] = useState(0)
    const [userSelled, setUserSelled] = useState(0)
    const [userLikedP, setUserLikedP] = useState(0)
    const [userLike, setUserLike] = useState(0)
    //console.log(user)

    useEffect(() => {
        setUserActive(0)
        setUserLike(0)
        setUserSelled(0)

    }, [user])

    useEffect(() => {
       
        
        if (userActive < user.active) {
            const timer = setTimeout(() => {
                setUserActive(prev => prev + 1)
            }, 50)
            return () => clearTimeout(timer)  
        }
       
    }, [userActive, user,user?.active,  ])

    useEffect(() => {

        if (userSelled < user.sold_items) {
            const timer2 = setTimeout(() => {
                setUserSelled(prev => prev + 1)
            }, 50)
            return () => clearTimeout(timer2)  
        }
    },[userSelled,user.sold_items, user])

    useEffect(() => {

       
        if (userLike < user.liked) {
            const timer3 = setTimeout(() => {
                setUserLike(prev => prev + 1)
            }, 50)
            return () => clearTimeout(timer3)  
        }
    },[,userLike,user.liked])
    
    useEffect(() => {

        if(user?.favorites){
            if (userLikedP < user?.favorites) {
                const timer4 = setTimeout(() => {
                    setUserLikedP(prev => prev + 1)
                }, 50)
                return () => clearTimeout(timer4)  
            }
        }

    } ,[userLikedP, user?.favorites])

    const startConversation = async () => {
        try {
            const result = await api.post("/conversations/conversation", {
                user2_id: user.user_id
            })
            console.log(result.data);
            navigate('/messages', { state: { selectedConversation: result.data } })


        } catch (error) {
            console.log(error)
        }
    }
   
    return (<>

        <div className="bg-slate-950  p-6 flex flex-col gap-6">

            {/* Fejléc kártya */}
            <div className="bg-slate-900 border justify-center border-slate-700/60 rounded-2xl p-8 flex flex-wrap gap-8">

                {/* Avatar */}
                <div className="w-24 h-24 rounded-2xl  bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-4xl shrink-0 shadow-lg shadow-blue-500/20">
                    {user.pfp ? <img src={user.pfp} alt="Profilkép" className="w-full h-full object-cover rounded-2xl" /> : user.fullname?.[0].toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex flex-col items-center  md:items-start gap-1 flex-1">
                    <h1 className="text-2xl font-bold text-white">{user.fullname}</h1>
                    <p className="text-slate-400 text-sm">{user.email}</p>
                    <p className="text-slate-500 text-xs truncate">{user.userClass} · Regisztráció dátuma:  {new Date(user.created_at).toLocaleDateString('hu-HU')}</p>

                    {/* Értékelés */}
                    <div className="flex items-center gap-1.5 mt-1">
                        {[1, 2, 3, 4, 5].map(star => (
                            <Star key={star} className={`w-4 h-4 ${star <= Math.round(Number(user.avg_ratings)) ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-700 text-slate-700'}`} />
                        ))}
                        <span className="text-slate-400 text-xs ml-1">({user.ratings_number} értékelés)</span>
                    </div>
                </div>

                {/* Gombok */}
                {!owner ?
                    <div className="flex flex-col gap-2">
                        <button onClick={() => startConversation()} className="flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 px-4 py-2.5 rounded-xl transition-all duration-200">
                            <Mail className="w-4 h-4" /> Üzenet
                        </button>
                        <button onClick={() => setOpenReportModal(!openReportModal)} className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white border border-slate-700/60 hover:bg-slate-800 px-4 py-2.5 rounded-xl transition-all duration-200">
                            <Flag className="w-4 h-4" /> Jelentés
                        </button>
                    </div>

                    :

                    <div className="flex items-end justify-end gap-2">
                       
                        <button onClick={() => navigate("/settings")} className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white border border-slate-700/60 hover:bg-slate-800 px-4 py-2.5 rounded-xl transition-all duration-200">
                            <Flag className="w-4 h-4" /> Szerkesztés
                        </button>
                    </div>

                }

            </div>

            {/* Statisztikák */}
            <div className="grid grid-cols-2 md:text-left text-center md:grid-cols-4 gap-3">
                {[
                    { label: "Aktív hirdetés", value: userActive, color: "text-blue-400" },
                    { label: "Eladott termék", value: userSelled, color: "text-green-400" },
                    { label: "Kedvencek", value: userLikedP, color: "text-red-400" },
                    { label: "Kapott like", value: userLike, color: "text-yellow-400" },
                ].map((stat) => (
                    <div key={stat.label} className={`bg-slate-900 border border-slate-700/60 rounded-2xl p-5 flex flex-col gap-1 ${!owner && stat.label === "Kedvencek" ? "hidden" : ""}`}>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                        <p className="text-slate-500 text-xs">{stat.label}</p>
                    </div>
                ))}
            </div>

        </div>


    </>)
}