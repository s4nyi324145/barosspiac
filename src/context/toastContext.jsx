import { createContext, useContext, useState } from "react";

export const ToastContext = createContext();

{/*
  ToastContext provides a way to manage and display toast notifications across the application. It includes functions to show different types of toasts (success, error, info) and automatically removes them after a certain duration.
*/}
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  {
    /* Show toast notification */
  }
  const showToast = (message, type) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const showSuccess = (message) => showToast(message, "success");
  const showError = (message) => showToast(message, "error");
  const showInfo = (message) => showToast(message, "info");

  return (
    <ToastContext.Provider
      value={{ toasts, showToast, showSuccess, showInfo, showError }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
