// context/notificationContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../config/api";

{/* This context is used to manage notifications across the app. It provides functions to fetch notifications and keeps track of unread count. */ }
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  {
    /* Get all notifications */
  }
  const getNotifications = async () => {
    try {
      const result = await api.get("notifications/notifications");
      setNotifications(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => n.is_read === 0).length;

  return (
    <NotificationContext.Provider
      value={{ getNotifications, unreadCount, notifications, setNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
