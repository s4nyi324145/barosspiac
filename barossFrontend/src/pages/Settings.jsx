import Navbar from "../components/Navbar"
import SettingsNavBar from "../components/SettingsNavBar"
import { useState } from "react"
import PersonalSetting from "../components/PersonalSetting"
import SecuritySetting from "../components/SecuritySetting"
import NotificationSetting from "../components/NotificationSetting"
import ProfileSetting from "../components/ProfileSetting"
import Footer from "../components/Footer"
import Categories from "../components/Categories"
export default function Settings(){

    const [activeSection, setActiveSection] = useState('személyes')


    return(<>
            <div className="bg-slate-950">
                    <Navbar/>
                    <Categories/>
                    <div className="flex flex-col md:flex-row">
                        <SettingsNavBar activeSection={activeSection} setActiveSection={setActiveSection}/>
                        {activeSection === 'személyes' && <PersonalSetting/> }
                        {activeSection === 'biztonsag' && <SecuritySetting/> }
                        {activeSection === 'ertesitesek' && <NotificationSetting/> }
                        {activeSection === 'fiok' && <ProfileSetting/> }
                    </div>
                    <Footer/>
            </div>
    
    </>)
}