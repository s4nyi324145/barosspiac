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

    const getAllUsers = async () => {
        try {
            const result = await api.get("/user/alluser")
            setAdminUsers(result.data)
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
        getAllUsers()
    }, [])



    if (!user || user.role !== "admin") return null

    return (<>
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <AdminNavbar />
            <div className="flex flex-1 flex-col">
                <AdminDashboard adminUsers={adminUsers.slice(0,5)} adminProducts={adminProducts.slice(0,5)}/>
                <AdminUsers adminUsers={adminUsers} />
            </div>
        </div>

    </>)
}