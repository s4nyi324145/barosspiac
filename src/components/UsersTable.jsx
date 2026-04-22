
import { Users, Tag, UserPlus, Flag, Eye, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
export default function UsersTables({adminUsers}) {
    
    const navigate = useNavigate()

    return(<>
    
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
    </>)
}