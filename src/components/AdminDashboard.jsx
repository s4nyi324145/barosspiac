import { useState, useEffect } from "react"
import api from "../config/api"
import { Users, Tag, UserPlus, Flag, Eye, Trash2 } from "lucide-react"
import { Navigate, useNavigate } from "react-router-dom"
import UsersTables from "./UsersTable"
import ProductTables from "./ProductTables"
export default function AdminDashboard({ adminUsers, adminProducts, setAdminProducts, setAdminUsers }) {

    const [statistics, setStatistics] = useState([])
    const navigate = useNavigate()

    const getStatistics = async () => {
        try {
            const result = await api.get('/statistics/statistics')
            setStatistics(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getStatistics()
    }, [])

    useEffect(() => { console.log(statistics) }, [statistics])

    return (<>
        <div>
            <div className=" border-slate-800 px-8 py-6">
                <h1 className="text-2xl font-bold text-white">
                    Áttekintés
                </h1>
            </div>

            <div className="flex flex-wrap justify-center px-8  gap-6 mt-2">
                {[
                    { value: statistics?.total_users || 0, label: 'Felhasználó', icon: Users, color: 'blue' },
                    { value: statistics?.active_products || 0, label: 'Aktív Hirdetés', icon: Tag, color: 'green' },
                    { value: statistics?.today_users || 0, label: 'Mai Regisztrációk', icon: UserPlus, color: 'yellow' },
                    { value: statistics?.active_reports || 0, label: 'Aktív Jelentések', icon: Flag, color: 'red' },
                ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-4 bg-slate-900 border border-slate-700/60 px-6 py-4 rounded-2xl">
                        <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/20 border border-${stat.color}-500/30 flex items-center justify-center shrink-0`}>
                            <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-white text-2xl font-bold">{stat.value}</p>
                            <p className="text-slate-500 text-xs">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="px-4 mt-6">
                <h1 className="font-medium text-white mb-4">Legújabb felhasználók listája</h1>
                <UsersTables adminUsers={adminUsers} setAdminUsers={setAdminUsers}/>


            </div>

            <div className="px-4 mt-8">
                <h1 className="font-medium text-white mb-4">Legújabb hirdetések listája</h1>
                <ProductTables adminProducts={adminProducts} setAdminProducts={setAdminProducts} />
                
            </div>

        </div>

    </>)
}