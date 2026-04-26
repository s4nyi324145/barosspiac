import { useAuth } from "../context/authContext"
import Navbar from "../components/Navbar"
import Categories from "../components/Categories"
import AdminNavbar from "../components/AdminNavbar"
import AdminDashboard from "../components/AdminDashboard"
import AdminUsers from "../components/AdminUsers"
import { useEffect, useState } from "react"
import api from "../config/api"
import AdminProducts from "../components/AdminProducts"
import AdminReports from "../components/AdminReports"
export default function Admin(){  

    const { user } = useAuth()
    const [adminUsers, setAdminUsers] = useState([])
    const [latestProducts, setLatestProducts] = useState([])
    const [latestUsers, setLatestUsers] = useState([])
    const [adminProducts, setAdminProducts] = useState([])
    const [usersPage, setUsersPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [productsPage, setProductsPage] = useState(1)
    const [totalProductsPages, setTotalProductsPages] = useState(1)

    const getAllUsers = async (page = 1) => {
        try {
            const result = await api.get(`/user/alluser?page=${page}`)
            setAdminUsers(result.data.users)            
            setLatestUsers(result.data.latests)
            setTotalPages(result.data.totalPages)
            setUsersPage(page)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllProducts = async (page = 1) => {
        try {
            const result = await api.get(`/product/allproduct?page=${page}`)
            setAdminProducts(result.data.products)
            setLatestProducts(result.data.latests)
            setTotalProductsPages(result.data.totalPages)
            setProductsPage(page)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    useEffect(() => { getAllUsers(usersPage) }, [usersPage])

    useEffect(() => { getAllProducts(productsPage) }, [productsPage])

    if (!user || user.role !== "admin") return null

    return <>
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <AdminNavbar />
            <div className="flex flex-1 flex-col">
                <AdminDashboard adminUsers={latestUsers} adminProducts={latestProducts} setAdminProducts={setAdminProducts} setAdminUsers={setAdminUsers}/>
                <AdminUsers totalPages={totalPages} setAdminUsers={setAdminUsers} usersPage={usersPage} setUsersPage={setUsersPage} adminUsers={adminUsers} />
                <AdminProducts totalPages={totalPages} adminProducts={adminProducts} totalProductsPages={totalProductsPages} setAdminProducts={setAdminProducts} productsPage={productsPage} setProductsPage={setProductsPage} />
                <AdminReports />
            </div>
        </div>

    </>
}