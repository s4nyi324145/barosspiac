import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from '../pages/Register'
import Login from '../pages/Login'
import { ToastProvider } from '../context/toastContext';
import { AuthProvider } from "../context/authContext";
import Browser from "./Browser";
import ProductDetails from "./ProductDetails";
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
          <Route path="/product/:product_id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
    </AuthProvider>
  )}

