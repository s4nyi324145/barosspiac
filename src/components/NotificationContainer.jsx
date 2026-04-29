import api from "../config/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/notificationContext";
import {
  MessageCircle,
  Star,
  Tag,
  Flag,
  Bell,
  CheckCheck,
  ChevronRight,
  X,
  Trash2,
} from "lucide-react";

export default function NotificationContainer() {
  const { notifications, unreadCount, setNotifications } = useNotification();
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const navigate = useNavigate();

  {/* Mark all notifications as read */}
  const markAllAsRead = async () => {
    try {
      await api.put("notifications/read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: 1 })));
    } catch (error) {
      console.log(error);
    }
  };

  const typeConfig = {
    new_message: {
      icon: MessageCircle,
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      border: "border-blue-500/30",
    },
    new_rating: {
      icon: Star,
      color: "text-yellow-400",
      bg: "bg-yellow-500/20",
      border: "border-yellow-500/30",
    },
    product_sold: {
      icon: Tag,
      color: "text-green-400",
      bg: "bg-green-500/20",
      border: "border-green-500/30",
    },
    report: {
      icon: Flag,
      color: "text-red-400",
      bg: "bg-red-500/20",
      border: "border-red-500/30",
    },
  };

  {/* Mark a single notification as read and navigate to its link */}
  const markAsRead = async (notification) => {
    try {
      await api.put(`notifications/read/${notification.notification_id}`);
      setNotifications((prev) =>
        prev.map((n) =>
          n.notification_id === notification.notification_id
            ? { ...n, is_read: 1 }
            : n,
        ),
      );
      navigate(notification.link);
    } catch (error) {
      console.log(error);
    }
  };

  {/* Delete a notification */}
  const deleteNotification = async (notification_id) => {
    try {
      await api.delete(`notifications/delete/${notification_id}`);
      setNotifications((prev) =>
        prev.filter((n) => n.notification_id !== notification_id),
      );
      setSelectedNotification(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {showWarningModal && (
        <div className="fixed   inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border animate-[scale-in_0.15s_ease-out]   border-slate-700/60 rounded-2xl p-6 w-full max-w-md flex flex-col gap-5 shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h2 className="text-white font-bold">Értesítés törlése</h2>
                <p className="text-slate-500 text-xs">
                  Ez a művelet nem visszavonható
                </p>
              </div>
            </div>

            {/* Text */}
            <p className="text-slate-400 text-sm">
              Biztosan törölni szeretnéd ezt az értesítést? A művelet véglegesen
              eltávolítja a listádról.
            </p>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowWarningModal(false);
                  setSelectedNotification(null);
                }}
                className="flex-1 py-2.5 rounded-xl border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium transition-all duration-200"
              >
                Mégse
              </button>
              <button
                onClick={() => {
                  deleteNotification(selectedNotification.notification_id);
                  setShowWarningModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-red-600/20"
              >
                Törlés
              </button>
            </div>
          </div>
        </div>
      )}

      <div className=" mx-auto p-6 min-h-screen flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-white font-bold text-xl">Értesítések</h2>
            {unreadCount > 0 && (
              <span className="text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded-full">
                {unreadCount} olvasatlan
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white border border-slate-700/60 hover:bg-slate-800 px-3 py-2 rounded-xl transition-all duration-200"
            >
              <CheckCheck className="w-4 h-4" />
              Összes olvasottnak jelölése
            </button>
          )}
        </div>

        {/* List */}
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700/60 flex items-center justify-center">
              <Bell className="w-8 h-8 text-slate-600" />
            </div>
            <div className="flex flex-col gap-1 text-center">
              <p className="text-white font-semibold">Még nincs értesítésed</p>
              <p className="text-slate-500 text-sm">
                Ha valaki üzenetet küld vagy értékel, itt fogod látni.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {notifications.map((notification) => {
              const config =
                typeConfig[notification.type] || typeConfig.new_message;
              const Icon = config.icon;
              return (
                <div
                  key={notification.notification_id}
                  onClick={() => markAsRead(notification)}
                  className={`flex group items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                    notification.is_read === 0
                      ? "bg-slate-800/60 border-slate-700/60 border-l-2 border-l-blue-500"
                      : "bg-slate-900/40 border-slate-800/60 hover:bg-slate-800/40"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center shrink-0`}
                  >
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>

                  {/* Text */}
                  <div className="flex  flex-col gap-0.5 flex-1 min-w-0">
                    <p
                      className={`text-sm ${notification.is_read === 0 ? "text-white font-medium" : "text-slate-300"} truncate`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {new Date(notification.created_at).toLocaleString(
                        "hu-HU",
                        { dateStyle: "short", timeStyle: "short" },
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col justify-end  items-end gap-4">
                    {/* Unread indicator */}
                    {notification.is_read === 0 && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1" />
                    )}

                    <div className="flex justify-between  items-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {/* Navigate to notification link */}
                      <div className="w-5 h-5 rounded-xl bg-slate-800 border  border-slate-700/60 flex items-center justify-center shrink-0">
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </div>

                      {/* Delete icon */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowWarningModal(true);
                          setSelectedNotification(notification);
                        }}
                        className="w-5 h-5 rounded-xl bg-slate-800 border  border-slate-700/60 flex items-center justify-center shrink-0"
                      >
                        <X className="w-4 h-4  text-slate-500" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
