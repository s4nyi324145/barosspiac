import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import api from "../config/api"
import { useAuth } from "../context/authContext"
import ProfileTabs from "../components/ProfileTabs"
import ProfileHeader from "../components/ProfileHeader"
import { useParams } from "react-router-dom"
import ReportModal from "../components/reportModal"
import Categories from "../components/Categories"
import Footer from "../components/Footer"
export default function Profile() {
    const { user } = useAuth()
    const { user_id } = useParams()
    const [userData, setUserData] = useState([])

    const owner = user && Number(user_id) === user.user_id
    
    const [openReportModal, setOpenReportModal] = useState(false)



    const getUserData = async () => {
        try {
            const result = await api.get(`user/statistic/${user_id}`)
            console.log();
            setUserData(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserData()
    }, [user_id])

    //useEffect(() =>{console.log(` userData: ${userData}`)}, [userData])

    return (
        <>
            <div className="flex flex-col min-h-screen bg-slate-950">
            {openReportModal && <ReportModal type={"user"} reported_id={user_id} product_id={null} openReportModal={openReportModal} setOpenReportModal={setOpenReportModal}/>}
                <Navbar />
                <Categories/>
                <ProfileHeader openReportModal={openReportModal} setOpenReportModal={setOpenReportModal} owner={owner} user={userData} />
                <ProfileTabs getUserData={getUserData} owner={owner} user={userData} />
                <Footer/>
            </div>
        </>
    );
}