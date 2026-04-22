import UsersTables from "./UsersTable"
export default function AdminUsers({adminUsers}){

    return(<>

     <div className="p-4">
     <div className=" border-slate-800 px-4 py-6">
                <h1 className="text-2xl font-bold text-white">
                    Felhasználók
                </h1>
            </div>
     <UsersTables adminUsers={adminUsers}/>
     </div>
    </>)
}