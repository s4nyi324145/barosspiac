import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from '../pages/Register'
import Login from '../pages/Login'
import { ToastProvider } from '../context/toastContext';
import { AuthProvider } from "../context/authContext";
import Browser from "./Browser";
import ProductDetails from "./ProductDetails";
import Toast from '../components/toastComponents/Toast'
import Favorites from "./Favorites";
import Home from "./Home";
import Settings from "./Settings";
import Upload from "./Upload";
import Messages from "./Messages";
import Profile from "./Profile";
import Notifications from "./Notifications";
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
          <Route path="/likes" element={<Favorites />} />
          <Route path="/profile/:user_id" element={<Profile/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/upload" element={<Upload/>}/>
          <Route path="/upload/:product_id" element={<Upload/>}/>
          <Route path="/messages" element={<Messages/>}/>
          <Route path="/notifications" element={<Notifications/>}/>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
    </AuthProvider>
  )}

