// context/notificationContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import api from '../config/api'


const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
        const [notifications, setNotifications] = useState([])
  

  
    const getNotifications = async () => {
        try {
            const result = await api.get('notifications/notifications')
            setNotifications(result.data)
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => { getNotifications() }, [])

    const unreadCount = notifications.filter(n => n.is_read === 0).length

    return (
        <NotificationContext.Provider value={{ getNotifications,  unreadCount, notifications,setNotifications}}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => useContext(NotificationContext)