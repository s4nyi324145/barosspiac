
export default function AdminUsers({adminUsers}){

    return(<>

     <div className="p-4">
     <table className="min-w-full border mt-8 border-gray-300">
    <thead className="bg-slate-500">
        <tr>
        <th className="p-2">ID</th>
        <th className="p-2">Név</th>
        <th className="p-2">Email</th>
        <th className="p-2">Osztály</th>
        <th className="p-2">Létrehozva</th>
        <th className="p-2">Szerepkör</th>
        <th className="p-2">Megerősítés</th>
        </tr>
    </thead>
    <tbody>
        {adminUsers.map((user) => (
        <tr key={user.user_id} className="text-center border-t">
            <td className="p-2">{user.user_id}</td>
            <td className="p-2">{user.fullname}</td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">{user.userClass}</td>
            <td className="p-2">
            {new Date(user.created_at).toLocaleString("hu-HU", {dateStyle: "short"})}
            </td>
            <td className="p-2">{user.role == "regisztralt" ? "Felhasználó" : "Admin"}</td>
            <td className="p-2">{user.verified == 0 ? "Nincs megerősítve" : "Megerősítve"}</td>
        </tr>
        ))}
    </tbody>
    </table>
     </div>
    </>)
}