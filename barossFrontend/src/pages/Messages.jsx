import Navbar from "../components/Navbar";
import Conversations from "../components/Conversations";
import { use, useEffect, useState } from "react";
import { SearchX } from "lucide-react";
import ChatPanel from "../components/ChatPanel";
import Categories from "../components/Categories";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import api from "../config/api";
import socket from "../config/socket";
export default function Messages() {

    const location = useLocation()
    const [selectedConversation, setSelectedConversation] = useState(location.state?.selectedConversation || null)
    const [unReadMessages, setUnreadMessages] = useState([])
    //console.log(location.state?.conversations_id);
    //useEffect(() => console.log(selectedConversation), [selectedConversation])
    const getUnredMessages = async () => {
        try {
            const result = await api.get('/messages/unreaded')

            setUnreadMessages(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    //useEffect(() => { console.log("asdasd") }, [])



    return (<>
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <Categories />
            <div className="flex flex-1">
                <Conversations getUnredMessages={getUnredMessages} unReadMessages={unReadMessages} setUnreadMessages={setUnreadMessages} selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation} />
                {!selectedConversation ?
                    <div className={`items-center flex-col gap-4 justify-center ${selectedConversation ? 'hidden' : ' hidden sm:flex sm:flex-[0.8]'}`}>
                        <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700/60 flex items-center justify-center">
                            <SearchX className="w-8 h-8 text-slate-600" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-slate-400 font-semibold text-lg"> Válassz egy beszélgetést</p>
                        </div>
                    </div>

                    :

                    <ChatPanel getUnredMessages={getUnredMessages} setUnreadMessages={setUnreadMessages} unReadMessages={unReadMessages} selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation} />
                }
            </div>
            <Footer />
        </div>

    </>)
}