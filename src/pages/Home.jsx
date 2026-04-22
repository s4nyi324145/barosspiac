import Navbar from "../components/Navbar"
import Header from "../components/Header"
import Categories from "../components/Categories"
import LatestProducts from "../components/LatestProducts"
import HowItWorks from "../components/HowItWorks"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import api from "../config/api"
import CommunitySection from "../components/CommunitySection"


export default function Home() {

    const [products, setProducts] = useState([])

    
        const getLatestProducts = async () => {
            try {
                const result = await api.get('/product/latestProduct')
                setProducts(result.data)
            } catch (error) {
                console.log(error.response)
            }
    
        }
    
        useEffect(() => {
            getLatestProducts()
        }, [])

    return (<>
        <div className="bg-slate-950">
            <Navbar />
            <Categories />
            <Header products={products} />
            <LatestProducts products={products} />
            <CommunitySection />
            <HowItWorks/>
            <Footer/>
        </div>
    
    </>)
}
        