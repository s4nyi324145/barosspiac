import Navbar from "../components/Navbar";
import Conversations from "../components/Conversations";
import { useEffect, useState } from "react";
import ChatPanel from "../components/ChatPanel";
export default function Messages(){

    const [selectedConversation, setSelectedConversation] = useState([])
    useEffect(() => console.log(selectedConversation),[selectedConversation])


    return(<>
        <div className="min-h-screen bg-slate-950 text-white">
                <Navbar/>
                <div className="flex flex-1">
                    <Conversations selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation}/>
                    <ChatPanel selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation}/>
                </div>
        </div>
    
    </>)
}