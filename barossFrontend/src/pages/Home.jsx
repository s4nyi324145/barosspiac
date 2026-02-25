import Navbar from "../components/Navbar"
import Header from "../components/Header"
import Categories from "../components/Categories"
import LatestProducts from "../components/LatestProducts"
import HowItWorks from "../components/HowItWorks"
import Footer from "../components/Footer"

export default function Home() {
    return (<>
        <div className="bg-slate-950">
            <Navbar />
            <Categories />
            <Header />
            <LatestProducts/>
            <HowItWorks/>
            <Footer/>
        </div>
    
    </>)
}
        