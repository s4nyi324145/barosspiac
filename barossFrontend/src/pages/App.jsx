import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from '../pages/Register'
import Login from '../pages/Login'
import { ToastProvider } from '../context/toastContext';
import Toast from '../components/toastComponents/Toast'

export default function App() {
  return (
    <ToastProvider>
      <Toast />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )}

