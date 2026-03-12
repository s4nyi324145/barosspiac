import Navbar from "../components/Navbar"
import Categories from "../components/Categories"
import FavoritesHeader from "./FavoritesHeader"
import api from "../config/api"
import { useEffect, useState } from "react"
import FavoritesContainer from "../components/FavoritesContainer"
import { useToast } from "../context/toastContext"

export default function Favorites() {


    const [likedProducts, setLikedProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const {showSuccess} = useToast()

    const getLikedProducts = async () => {

        try {
            const result = await api.get('/likes/alllikes')
            setLikedProducts(result.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const deleteAllLikes = async() =>{
        try {
            const result = await api.delete('likes/alllike')
            showSuccess(result.data.message)
            setLikedProducts([])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { getLikedProducts() }, [])
    useEffect(() => { console.log(likedProducts) }, [likedProducts])


    return (<>
        <Navbar />
        <Categories />
        <FavoritesHeader deleteAllLikes={deleteAllLikes} favoritesCount={likedProducts.length} />
        <FavoritesContainer  loading={loading} likedProducts={likedProducts}/>
    </>)
}