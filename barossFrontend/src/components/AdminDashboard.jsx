import { useState, useEffect } from "react"
import api from "../config/api"
import { Users, Tag, UserPlus, Flag, Eye, Trash2 } from "lucide-react"
import { Navigate, useNavigate } from "react-router-dom"
export default function AdminDashboard({ adminUsers, adminProducts }) {

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
                <div className="bg-slate-900  border  border-slate-700/60 rounded-2xl overflow-hidden">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b  border-slate-800">
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Név</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Osztály</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Létrehozva</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Szerepkör</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Státusz</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Műveletek</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y  divide-slate-800">
                            {adminUsers.map((user) => (
                                <tr key={user.user_id} className="hover:bg-slate-800/40 transition-colors duration-150">
                                    <td className="px-4 py-3 text-slate-500 text-sm">#{user.user_id}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
                                                {user.fullname?.charAt(0).toUpperCase()}
                                            </div>
                                            <p className="text-white text-sm font-medium">{user.fullname}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-slate-400 text-sm">{user.email}</td>
                                    <td className="px-4 py-3 text-slate-400 text-sm">{user.userClass}</td>
                                    <td className="px-4 py-3 text-slate-500 text-sm">
                                        {new Date(user.created_at).toLocaleString("hu-HU", { dateStyle: "short" })}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${user.role === 'admin'
                                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                            : 'bg-slate-700/60 text-slate-300 border-slate-600/50'
                                            }`}>
                                            {user.role === 'admin' ? 'Admin' : 'Felhasználó'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${user.verified === 1
                                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                                            }`}>
                                            {user.verified === 1 ? 'Megerősítve' : 'Nincs megerősítve'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => navigate(`/profile/${user.user_id}`)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-200"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() => handleDeleteUser(user.user_id)}
                                                className="p-1.5 rounded-lg text-red-400 hover:text-white hover:bg-red-500/20 transition-all duration-200"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>

            <div className="px-4 mt-8">
                <h1 className="font-medium text-white mb-4">Legújabb hirdetések listája</h1>

                <div className="bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-slate-800">
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Név</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Feladó</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Kategória</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Státusz</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Feltöltés</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Műveletek</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-800">
                            {adminProducts.map((product) => (
                                <tr
                                    key={product.product_id}
                                    className="hover:bg-slate-800/40 transition-colors duration-150"
                                >
                                    <td className="px-4 py-3 text-slate-500 text-sm">
                                        #{product.product_id}
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">

                                            <p className="text-white text-sm font-medium">
                                                {product.product_title}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3 flex items-center gap-2 text-slate-400 text-sm">
                                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xs">
                                            {product.product_title?.charAt(0).toUpperCase()}
                                        </div>
                                        {product.fullname}
                                    </td>

                                    <td className="px-4 py-3 text-slate-400 text-sm">
                                        {product.category_name} - {product.sub_category_name} - {product.sub_sub_name}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span
                                            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${product.status === "active"
                                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                                }`}
                                        >
                                            {product.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 text-slate-500 text-sm">
                                        {new Date(product.product_upload).toLocaleString("hu-HU", {
                                            dateStyle: "short",
                                        })}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => navigate(`/product/${product.product_id}`)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-200"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() => handleDeleteUser(product.product_id)}
                                                className="p-1.5 rounded-lg text-red-400 hover:text-white hover:bg-red-500/20 transition-all duration-200"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleMarkSold(product.product_id)}
                                                className="p-1.5 rounded-lg text-green-400 hover:text-white hover:bg-red-500/20 transition-all duration-200"
                                            >
                                                <Tag className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    </>)
}