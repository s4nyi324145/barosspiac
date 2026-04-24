import { useAuth } from "../context/authContext"
import Navbar from "../components/Navbar"
import Categories from "../components/Categories"
import AdminNavbar from "../components/AdminNavbar"
import AdminDashboard from "../components/AdminDashboard"
import AdminUsers from "../components/AdminUsers"
import { useEffect, useState } from "react"
import api from "../config/api"
export default function Admin(params) { 

    const { user } = useAuth()
    const [adminUsers, setAdminUsers] = useState([])
    const [adminProducts, setAdminProducts] = useState([])
    const [usersPage, setUsersPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const getAllUsers = async (page = 1) => {
        try {
            const result = await api.get(`/user/alluser?page=${page}`)
            setAdminUsers(result.data.users)
            setTotalPages(result.data.totalPages)
            setUsersPage(page)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllProducts = async () => {
        try {
            const result = await api.get("/product/allproduct")
            setAdminProducts(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    useEffect(() => { getAllUsers(usersPage) }, [usersPage])



    if (!user || user.role !== "admin") return null

    return (<>
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <AdminNavbar />
            <div className="flex flex-1 flex-col">
                <AdminDashboard adminUsers={adminUsers.slice(0,5)} adminProducts={adminProducts.slice(0,5)}/>
                <AdminUsers totalPages={totalPages} usersPage={usersPage} setUsersPage={setUsersPage} adminUsers={adminUsers} />
            </div>
        </div>

    </>)
}