import { useAuth } from "../context/authContext"
import { useState, useEffect, useRef } from "react"
import { Send, ArrowLeft, Check, CheckCheck } from "lucide-react"
import api from "../config/api"
import socket from '../config/socket'

export default function ChatPanel({ getUnredMessages, selectedConversation, setSelectedConversation }) {
    const { user } = useAuth()
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const bottomRef = useRef(null)
    const messagesContainerRef = useRef(null)

    const getMessages = async () => {
        try {
            const result = await api.get(`/messages/message/${selectedConversation.conversations_id}`)
            setMessages(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const scrollToBottom = (behavior = 'smooth') => {
        bottomRef.current?.scrollIntoView({ behavior })
    }

    useEffect(() => {
        if (!selectedConversation) return

        getMessages()

        socket.emit('join_conversation', selectedConversation.conversations_id)


        socket.emit('mark_as_read', {
            conversation_id: selectedConversation.conversations_id,
            user_id: user.user_id
        })
        getUnredMessages()

        socket.on('receive_message', (msg) => {
            if (msg.sender_id === user.user_id) {
                setMessages(prev => prev.map(m =>
                    m.message_id.toString().startsWith('temp_')
                        ? { ...msg }
                        : m
                ))
            } else if (msg.conversation_id === selectedConversation.conversations_id) {
                setMessages(prev => [...prev, msg])
                socket.emit('mark_as_read', {
                    conversation_id: selectedConversation.conversations_id,
                    user_id: user.user_id
                })
                getUnredMessages()
            } else {
                getUnredMessages()
            }
        })

        socket.on('messages_read', ({ conversation_id }) => {
            if (conversation_id === selectedConversation.conversations_id) {
                setMessages(prev => prev.map(m => ({
                    ...m,
                    message_status: m.sender_id === user.user_id ? 'Olvasva' : m.message_status
                })))
            }
        })

        socket.on('message_deleted', ({ message_id }) => {
            setMessages(prev => prev.filter(m => m.message_id !== message_id))
        })

        return () => {
            socket.off('receive_message')
            socket.off('message_deleted')
            socket.off('messages_read')
        }
    }, [selectedConversation])

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom('instant')
        }
    }, [messages.length === 0 ? 0 : messages[0]?.message_id])


    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom('smooth')
        }
    }, [messages.length])

    const sendMessage = () => {
        if (!input.trim()) return

        const tempMessage = {
            message_id: `temp_${Date.now()}`,
            conversation_id: selectedConversation.conversations_id,
            sender_id: user.user_id,
            message: input,
            message_status: 'Elküldve',
            sent_at: new Date(),
            fullname: user.fullname,
            pfp: user.pfp
        }

    
        setMessages(prev => [...prev, tempMessage])

        socket.emit('send_message', {
            conversation_id: selectedConversation.conversations_id,
            sender_id: user.user_id,
            message: input,
            sended_id: selectedConversation.user1_id === user.user_id
                ? selectedConversation.user2_id
                : selectedConversation.user1_id
        })

        setInput('')
    }

    const handleDelete = (msg) => {
        socket.emit('delete_message', {
            message_id: msg.message_id,
            conversation_id: selectedConversation.conversations_id,
            sender_id: user.user_id
        })
        setMessages(prev => prev.filter(m => m.message_id !== msg.message_id))
    }


    const StatusIcon = ({ status }) => {
        if (status === 'Olvasva') return <CheckCheck className="w-3 h-3 text-blue-400" />
        return <Check className="w-3 h-3 text-slate-500" />
    }

    return (
        <div className={`flex-col bg-slate-950 ${selectedConversation ? 'flex flex-1 sm:flex-[0.8]' : 'hidden sm:flex sm:flex-[0.8]'}`}>

            {/* Fejléc */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800 bg-slate-900/50">
                <button
                    onClick={() => setSelectedConversation(null)}
                    className="sm:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden">
                    {selectedConversation.pfp
                        ? <img src={selectedConversation.pfp} alt="Profilkép" className="w-full h-full object-cover" />
                        : selectedConversation.fullname?.charAt(0).toUpperCase()
                    }
                </div>

                <div className="flex flex-col">
                    <p className="text-white text-sm font-semibold">{selectedConversation.fullname}</p>

                </div>
            </div>

            {/* Üzenetek */}
            <div
                ref={messagesContainerRef}
                className="flex flex-col flex-1 overflow-y-auto max-h-[800px] scrollbar-hide p-4 gap-1"
            >
                {messages.map((msg, index) => {
                    const isMine = msg.sender_id === user.user_id
                    const prevMsg = messages[index - 1]
                    const showAvatar = !prevMsg || prevMsg.sender_id !== msg.sender_id
                    const showName = showAvatar

                    return (
                        <div
                            key={msg.message_id}
                            onContextMenu={(e) => {
                                e.preventDefault()
                                if (isMine) handleDelete(msg)
                            }}
                            className={`flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'} ${showAvatar ? 'mt-3' : 'mt-0.5'}`}
                        >
                            {/* Másik user avatarja */}
                            {!isMine && (
                                <div className={`w-8 h-8 rounded-xl overflow-hidden shrink-0 ${showAvatar ? 'visible' : 'invisible'}`}>
                                    {msg.pfp
                                        ? <img src={msg.pfp} className="w-full h-full object-cover" />
                                        : <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xs">
                                            {msg.fullname?.[0].toUpperCase()}
                                        </div>
                                    }
                                </div>
                            )}

                            <div className={`flex flex-col gap-0.5 max-w-[65%] ${isMine ? 'items-end' : 'items-start'}`}>

                                {/* Név — csak ha előző üzenet más usertől volt */}
                                {showName && !isMine && (
                                    <p className="text-slate-500 text-xs px-1">{selectedConversation.fullname}</p>
                                )}

                                {/* Buborék */}
                                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isMine
                                    ? 'bg-blue-600 text-white rounded-br-sm'
                                    : 'bg-slate-800 text-slate-200 rounded-bl-sm'
                                    }`}>
                                    {msg.message}
                                </div>

                                {/* Idő + státusz */}
                                <div className="flex items-center gap-1 px-1">
                                    <p className="text-slate-600 text-xs">
                                        {new Date(msg.sent_at).toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                    {isMine && <StatusIcon status={msg.message_status} />}
                                </div>
                            </div>

                            {/* Saját avatar */}
                            {isMine && (
                                <div className={`w-8 h-8 rounded-xl overflow-hidden shrink-0 ${showAvatar ? 'visible' : 'invisible'}`}>
                                    {user.pfp
                                        ? <img src={user.pfp} className="w-full h-full object-cover" />
                                        : <div className="w-full h-full bg-slate-700 flex items-center justify-center text-white font-bold text-xs">
                                            {user.fullname?.[0].toUpperCase()}
                                        </div>
                                    }
                                </div>
                            )}
                        </div>
                    )
                })}
                <div ref={bottomRef} />
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
                        className={`shrink-0 transition-all duration-200 ${input.trim() ? 'text-blue-400 hover:text-blue-300' : 'text-slate-700'}`}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>

        </div>
    )
}