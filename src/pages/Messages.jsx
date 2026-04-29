// Messages.jsx
import Navbar from "../components/Navbar";
import Conversations from "../components/Conversations";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatPanel from "../components/ChatPanel";
import { useLocation } from "react-router-dom";
import api from "../config/api";

export default function Messages() {
  const location = useLocation();
  const [selectedConversation, setSelectedConversation] = useState(
    location.state?.selectedConversation || null,
  );
  const [unReadMessages, setUnreadMessages] = useState([]);

  {
    /* Get unread messages */
  }
  const getUnredMessages = async () => {
    try {
      const result = await api.get("/messages/unreaded");
      setUnreadMessages(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-white overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Conversations — On mobile if a conversation is selected */}
        <div
          className={`
                    w-full sm:w-72 sm:shrink-0 
                    border-r border-slate-800 
                    flex flex-col overflow-hidden
                    ${selectedConversation ? "hidden sm:flex" : "flex"}
                `}
        >
          <Conversations
            getUnredMessages={getUnredMessages}
            unReadMessages={unReadMessages}
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
          />
        </div>

        {/* ChatPanel — On mobile only if a conversation is selected, always on desktop */}
        <div
          className={`
                    flex-1 flex flex-col overflow-hidden
                    ${selectedConversation ? "flex" : "hidden sm:flex"}
                `}
        >
          {selectedConversation ? (
            <ChatPanel
              getUnredMessages={getUnredMessages}
              selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700/60 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-slate-600" />
              </div>
              <div className="flex flex-col gap-1 text-center">
                <p className="text-white font-semibold">
                  Válassz egy beszélgetést
                </p>
                <p className="text-slate-500 text-sm">
                  A bal oldali listából válassz egyet
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
