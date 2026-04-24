import UsersTables from "./UsersTable"
export default function AdminUsers({ adminUsers, usersPage, setUsersPage, totalPages }) {
    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="border-slate-800 px-4 py-6">
                <h1 className="text-2xl font-bold text-white">Felhasználók</h1>
            </div>

            <UsersTables adminUsers={adminUsers} />

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 py-4">
                <button
                    onClick={() => setUsersPage(prev => Math.max(prev - 1, 1))}
                    disabled={usersPage === 1}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        usersPage === 1
                            ? 'text-slate-600 cursor-not-allowed'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60'
                    }`}
                >
                    ← Előző
                </button>

                <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setUsersPage(page)}
                            className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200 ${
                                usersPage === page
                                    ? 'bg-blue-600 text-white'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setUsersPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={usersPage === totalPages}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        usersPage === totalPages
                            ? 'text-slate-600 cursor-not-allowed'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60'
                    }`}
                >
                    Következő →
                </button>
            </div>
        </div>
    )
}