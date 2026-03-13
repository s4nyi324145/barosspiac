import Navbar from "../components/Navbar"
import SettingsNavBar from "../components/SettingsNavBar"
import { useState } from "react"
import PersonalSetting from "../components/PersonalSetting"
import SecuritySetting from "../components/SecuritySetting"
export default function Settings(){

    const [activeSection, setActiveSection] = useState('személyes')


    return(<>
            <div className="bg-slate-950">
                    <Navbar/>
                    <div className="flex">
                        <SettingsNavBar activeSection={activeSection} setActiveSection={setActiveSection}/>
                        {activeSection === 'személyes' && <PersonalSetting/> }
                        {activeSection === 'biztonsag' && <SecuritySetting/> }
                    </div>
            </div>
    
    </>)
}