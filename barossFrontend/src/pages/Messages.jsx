import Navbar from "../components/Navbar";
import Conversations from "../components/Conversations";
import { useEffect, useState } from "react";
import { SearchX } from "lucide-react";
import ChatPanel from "../components/ChatPanel";
import Categories from "../components/Categories";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
export default function Messages() {

    const location = useLocation()
    const [selectedConversation, setSelectedConversation] = useState(location.state?.selectedConversation || null)
    //console.log(location.state?.conversations_id);
    //useEffect(() => console.log(selectedConversation), [selectedConversation])


    return (<>
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Categories/>
            <div className="flex flex-1">
                <Conversations selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation} />
                {!selectedConversation ?
                    <div className="flex items-center flex-col gap-4 justify-center flex-[0.8]">
                        <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700/60 flex items-center justify-center">
                            <SearchX className="w-8 h-8 text-slate-600" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-slate-400 font-semibold text-lg"> Válassz egy beszélgetést</p>
                        </div>
                    </div>

                    :

                    <ChatPanel selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation} />
                }
            </div>
            <Footer/>
        </div>

    </>)
}