
import RegisterButton from "./RegisterButton"
import { Heart, Bell, Search, Mail, Plus, MessageCircle } from "lucide-react";
import { useAuth } from "../context/authContext"
import { User, Tag, Settings, LogOut,Menu, X, Home, LogIn, UserPlus } from "lucide-react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.id !== 'avatar') setShowDropdown(false);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
        <div className="bg-slate-900 border-b border-slate-800">
            <div className="p-4 flex items-center justify-between gap-4">

                {/* Logo */}
                <p onClick={() => navigate('/')} className="text-white cursor-pointer font-bold shrink-0">
                    Baross piac
                </p>

                {/* Kereső — mobilon kisebb */}
                <div className="flex-1 max-w-xs md:max-w-md flex items-center gap-3 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 group">
                    <Search className="w-4 h-4 text-slate-500 group-focus-within:text-blue-400 shrink-0" />
                    <input
                        type="text"
                        className="bg-transparent w-full outline-none text-sm text-slate-200 placeholder-slate-600"
                        placeholder="Keresés..."
                    />
                </div>

                {user ? (
                    <div className="flex items-center gap-2">

                        {/* Desktopon felirattal, mobilon csak ikon */}
                        <a href="/upload" className="hidden md:flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20">
                            <Plus className="w-4 h-4" />
                            Hirdetés feladása
                        </a>
                        <a href="/upload" className="md:hidden p-2.5 rounded-xl text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200">
                            <Plus className="w-5 h-5" />
                        </a>

                        {/* Kedvencek — mobilon elrejtve */}
                        <a href="/likes" className="hidden md:block p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200">
                            <Heart className="w-5 h-5" />
                        </a>

                        {/* Üzenetek — mobilon elrejtve */}
                        <a href="/messages" className="hidden md:block p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200">
                            <MessageCircle className="w-5 h-5" />
                        </a>

                        {/* Avatar — mindig látható, desktopon dropdown */}
                        <div
                            id="avatar"
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="hidden md:flex w-9 h-9 rounded-xl relative bg-gradient-to-br from-blue-500 to-blue-700 items-center justify-center text-white font-bold text-sm cursor-pointer shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-200"
                        >
                            {user.fullname?.charAt(0).toUpperCase()}

                            {showDropdown && (
                                <div className="absolute top-11 right-[-20px] w-48 bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden z-50">
                                    <div className="px-4 py-3 border-b border-slate-800">
                                        <p className="text-white text-sm font-semibold truncate">{user.fullname}</p>
                                        <p className="text-slate-500 text-xs">{user.userClass}</p>
                                    </div>
                                    <div className="p-1.5 flex flex-col gap-0.5">
                                        <a href={`/profile/${user.user_id}`} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200">
                                            <User className="w-4 h-4" /> Profilom
                                        </a>
                                        <a href="/notifications" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200">
                                            <Mail className="w-4 h-4" /> Értesítéseim
                                        </a>
                                        <a href="/settings" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200">
                                            <Settings className="w-4 h-4" /> Beállítások
                                        </a>
                                    </div>
                                    <div className="p-1.5 border-t border-slate-800">
                                        <button
                                            onClick={() => logout()}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-400 hover:text-white hover:bg-red-500/20 transition-all duration-200"
                                        >
                                            <LogOut className="w-4 h-4" /> Kijelentkezés
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Hamburger — csak mobilon */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
                        >
                            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <a href="/login" className="hidden md:block text-sm font-medium text-slate-300 hover:text-white border border-slate-700/50 px-4 py-2 rounded-xl hover:bg-slate-800/60 transition-colors duration-200">
                            Bejelentkezés
                        </a>
                        <div className="hidden md:block">
                            <RegisterButton />
                        </div>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
                        >
                            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                )}

            </div>

            {/* Mobil menü */}
            {menuOpen && (
                <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-3 flex flex-col gap-1">
                    <a href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200">
                        <Home className="w-4 h-4" /> Főoldal
                    </a>
                    <a href="/browser" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200">
                        <Search className="w-4 h-4" /> Böngészés
                    </a>

                    {user ? (
                        <>
                            <a href="/upload" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200">
                                <Plus className="w-4 h-4" /> Hirdetés feladása
                            </a>
                            <a href="/likes" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200">
                                <Heart className="w-4 h-4" /> Kedvencek
                            </a>
                            <a href="/messages" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200">
                                <MessageCircle className="w-4 h-4" /> Üzenetek
                            </a>
                            <a href={`/profile/${user.user_id}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200">
                                <User className="w-4 h-4" /> Profilom
                            </a>
                            <a href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200">
                                <Settings className="w-4 h-4" /> Beállítások
                            </a>
                            <div className="border-t border-slate-800 mt-1 pt-1">
                                <button
                                    onClick={() => logout()}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-white hover:bg-red-500/20 transition-all duration-200"
                                >
                                    <LogOut className="w-4 h-4" /> Kijelentkezés
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <a href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200">
                                <LogIn className="w-4 h-4" /> Bejelentkezés
                            </a>
                            <a href="/register" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white bg-blue-600 hover:bg-blue-500  transition-all duration-200">
                                <UserPlus className="w-4 h-4" /> Regisztráció
                            </a>
                        </>
                    )}
                </div>
            )}

        </div>
    </>
)

}