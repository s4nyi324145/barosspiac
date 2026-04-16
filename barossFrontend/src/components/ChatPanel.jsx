import { useAuth } from "../context/authContext"
import { useState, useEffect, useRef, use } from "react"
import { Send, ArrowBigLeft } from "lucide-react"
import api from "../config/api"
import socket from '../config/socket'
export default function ChatPanel({ getUnredMessages, unReadMessages, setUnreadMessages, selectedConversation, setSelectedConversation }) {
    const { user } = useAuth()
    const [messages, setMessages] = useState([])

    const [input, setInput] = useState('')
    const bottomRef = useRef(null)

    const getMessages = async () => {
        try {
            const result = await api.get(`/messages/message/${selectedConversation.conversations_id}`)
            setMessages(result.data)
        } catch (error) {
            console.log(error)
        }
    }





    useEffect(() => {
        // Belép a szobába a felhasználó
        socket.emit('join_conversation', selectedConversation.conversations_id)


        // Új üzenet fogadása
        socket.on('receive_message', (msg) => {

            if (msg.conversation_id === selectedConversation.conversations_id) {
                setMessages(prev => [...prev, msg])

            }


        })



        return () => {
            socket.off('receive_message')
        }
    }, [selectedConversation, messages])



    const sendMessage = () => {
        if (!input.trim()) return
        console.log(selectedConversation);
        
        socket.emit('send_message', {
            conversation_id: selectedConversation.conversations_id,
            sender_id: user.user_id,
            message: input,
            message_state: 'Elküldve',
            sended_id: selectedConversation.user1_id === user.user_id ? selectedConversation.user2_id : selectedConversation.user1_id
        })

        setInput('')
    }

    useEffect(() => { getMessages() }, [selectedConversation])
    useEffect(() => { console.log(messages) }, [messages])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className={` flex-col   bg-slate-950 ${selectedConversation ? 'flex flex-1  sm:flex-[0.8]' : ' hidden sm:flex-[0.8]'}`}>

            {/* Fejléc */}
            <div className="flex gap-12 items-center  px-5 py-4 border-b border-slate-800 bg-slate-900/50">
                <div className="flex sm:hidden ">
                    <ArrowBigLeft onClick={() => setSelectedConversation(null)} />
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {selectedConversation.fullname?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <p className="text-white text-sm font-semibold">{selectedConversation.fullname}</p>
                        <p className="text-slate-500 text-xs">Aktív</p>
                    </div>
                </div>
            </div>

            {/* Üzenetek */}
            <div className="flex  flex-col flex-1 overflow-y-auto  p-4 gap-3">
                {messages.map(msg => {
                    const isMine = msg.sender_id === user.user_id
                    return (
                        <div onContextMenu={(e) => {
                                e.preventDefault(); 
                                if (isMine) {
                                    if (window.confirm('Biztosan törölni szeretnéd az üzenetet?')) {
                                        socket.emit('delete_message', { message_id: msg.message_id, conversation_id: selectedConversation.conversations_id })
                                        setMessages(prev => prev.filter(m => m.message_id !== msg.message_id))
                                    } 
                                }
                            }}  key={msg.message_id} className={`flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}>



                            {/* Másik user avatarja */}
                            {!isMine && (
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xs shrink-0 mb-1">
                                    {selectedConversation.fullname?.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <div className={`flex flex-col gap-1 max-w-[65%] ${isMine ? 'items-end' : 'items-start'}`}>

                                {/* Név */}
                                <p className="text-slate-500 text-xs px-1">
                                    {isMine ? 'Te' : selectedConversation.fullname}
                                </p>

                                {/* Buborék */}
                                <div className={`px-4 py-2.5 rounded-2xl text-sm ${isMine
                                    ? 'bg-blue-600 text-white rounded-br-sm'
                                    : 'bg-slate-800 text-slate-200 rounded-bl-sm'
                                    }`}>
                                    {msg.message}
                                </div>

                               
                                <div className="flex items-center gap-1">
                                     {/* Idő */}
                                    <p className="text-slate-600 text-xs px-1">
                                        {new Date(msg.sent_at).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                     {/* Állapot */}
                                    {isMine && (
                                        <p className={`text-slate-600 text-xs px-1 ${msg.message_state === 'Elküldve' ? 'italic' : ''}`}>
                                            {msg.message_state}
                                        </p>
                                    )}
                                </div>

                            </div>

                            {/* Saját avatar */}
                            {isMine && (
                                <div className="w-8 h-8 rounded-xl bg-slate-700 flex items-center justify-center text-white font-bold text-xs shrink-0 mb-1">
                                    {user.fullname?.charAt(0).toUpperCase()}
                                </div>
                            )}

                        </div>
                    )
                })}
                {/*<div ref={bottomRef} /> */}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && input.trim() && sendMessage()}
                        placeholder="Írj egy üzenetet..."
                        className="bg-transparent flex-1 outline-none text-sm text-slate-200 placeholder-slate-600"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim()}
                        className={`shrink-0 transition-all duration-200 ${input.trim() ? 'text-blue-400 hover:text-blue-300' : 'text-slate-700'
                            }`}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>

        </div>
    )
}