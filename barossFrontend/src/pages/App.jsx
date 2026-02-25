import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from '../pages/Register'
import Login from '../pages/Login'
import { ToastProvider } from '../context/toastContext';
import { AuthProvider } from "../context/authContext";
import Browser from "./Browser";
import Toast from '../components/toastComponents/Toast'
import Home from "./Home";

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
      <Toast />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/browser" element={<Browser />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
    </AuthProvider>
  )}

