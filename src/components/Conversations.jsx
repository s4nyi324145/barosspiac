
import { Search, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"
import api from "../config/api"
import socket from "../config/socket"


export default function Conversations({ getUnredMessages, unReadMessages, selectedConversation, setSelectedConversation }) {
    const [conversations, setConversations] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const getConversations = async () => {
        try {
            const result = await api.get('/conversations/conversations')
            setConversations(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getConversations()
        getUnredMessages()

        socket.on('receive_message', () => {
            getUnredMessages()
            getConversations()
        })

        return () => socket.off('receive_message')
    }, [])

    const filtered = conversations.filter(con =>
        con.fullname?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="flex flex-col h-full overflow-hidden">

            {/* Fejléc */}
            <div className="p-4 border-b border-slate-800 shrink-0">
                <h2 className="text-white font-bold text-lg mb-3">Üzenetek</h2>
                <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 group">
                    <Search className="w-4 h-4 text-slate-500 group-focus-within:text-blue-400 shrink-0" />
                    <input
                        type="text"
                        className="bg-transparent w-full outline-none text-sm text-slate-200 placeholder-slate-600 min-w-0"
                        placeholder="Keresés..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Lista */}
            <div className="flex flex-col overflow-y-auto flex-1 scrollbar-hide">
                {conversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center flex-1 gap-3 p-6 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700/60 flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-slate-600" />
                        </div>
                        <p className="text-slate-500 text-sm">Még nincs egy beszélgetésed sem</p>
                    </div>
                ) : (
                    filtered.map(con => {
                        const unread = unReadMessages.find(m => m.conversations_id === con.conversations_id)
                        const isSelected = selectedConversation?.conversations_id === con.conversations_id

                        return (
                            <div
                                key={con.conversations_id}
                                onClick={() => setSelectedConversation(con)}
                                className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer border-b border-slate-800/60 transition-all duration-200 border-l-2 shrink-0 ${
                                    isSelected
                                        ? 'bg-blue-600/10 border-l-blue-500'
                                        : 'hover:bg-slate-800/40 border-l-transparent'
                                }`}
                            >
                                {/* Avatar */}
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden">
                                    {con.pfp
                                        ? <img src={con.pfp} className="w-full h-full object-cover" />
                                        : con.fullname?.[0].toUpperCase()
                                    }
                                </div>

                                {/* Info — min-w-0 kell a truncate-hez */}
                                <div className="flex flex-col flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                        <p className={`text-sm font-semibold truncate ${unread ? 'text-white' : 'text-slate-300'}`}>
                                            {con.fullname}
                                        </p>
                                        <p className="text-slate-600 text-xs shrink-0">
                                            {new Date(con.sent_at || con.created_at).toLocaleDateString('hu-HU')}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between gap-1 mt-0.5">
                                        <p className={`text-xs truncate min-w-0 ${unread ? 'text-slate-300 font-medium' : 'text-slate-500'}`}>
                                            {con.message ?? 'Még nincs üzenet'}
                                        </p>
                                        {unread && (
                                            <div className="min-w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center px-1.5 shrink-0">
                                                {unread.unread_count}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}