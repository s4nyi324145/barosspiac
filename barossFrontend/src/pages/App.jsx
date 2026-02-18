import { useEffect, useState } from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Register from '../pages/Register'
import api from '../config/api.js'
import {User, Book, Mail,Lock, Eye, EyeClosed} from 'lucide-react'

function App() {

  const [checked, setChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [fullname, setFullname] = useState("")
  const [userClass, setUserClass] = useState("")
  const [email, setEmail] = useState("")
  const [psw, setPsw] = useState("")


/*  useEffect(() =>{
    console.log(fullname),
    console.log(userClass),
    console.log(email),
    console.log(psw);
  }, [psw,email,fullname,userClass])*/

  const handleSubmit = async(e) =>{
      e.preventDeafult()
      try {
         const response = api.post('/user/register', {
           fullname: fullname,
           userClass: userClass,
           email:email,
           psw:psw
         })

         console.log(response)
      } catch (error) {
         console.log(error)
      }
  }

    return (
    
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
    
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 opacity-10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 opacity-10 rounded-full blur-3xl pointer-events-none" />
  
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/50 rounded-3xl p-10 shadow-2xl shadow-black/60">
    
      
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
    
         
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/30">
                B
              </div>
              <span className="text-xs font-semibold text-blue-400 tracking-widest uppercase">
                Baross Piac
              </span>
            </div>
    
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl mx-auto mb-5 shadow-lg shadow-green-500/30">
                  ✓
                </div>
                <p className="text-white font-semibold text-xl mb-2">Sikeres regisztráció!</p>
                <p className="text-slate-400 text-sm">Ellenőrizd az email fiókodat a visszaigazoláshoz.</p>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-white mb-1">Fiók létrehozása</h1>
                <p className="text-slate-400 text-sm mb-8">Csatlakozz az iskolai piachoz még ma</p>
    
                <form onSubmit={(e) => handleSubmit(e)}>
                  {/*Teljes nev*/}
                <div className="mb-5">
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Teljes név
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors duration-200">
                      <User className="w-4 h-4" />
                    </span>

                    <input
                      type="text"
                      required
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      placeholder="pl. Kovács Anna"
                      className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    />
                  </div>

                </div>
    
               {/*Osztály*/}
                <div className="mb-5">
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Osztály
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 text-sm select-none"><Book /></span>
                    <select  value={userClass}  onChange={(e) => setUserClass(e.target.value) } className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-12 pr-8 py-3.5 text-sm text-slate-200 outline-none focus:border-blue-500 focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 appearance-none cursor-pointer">
                      <option value="12a">12/A</option>
                      <option value="12b">12/B</option>
                      <option value="11a">11/A</option>
                      <option value="11b">11/B</option>
                      <option value="10a">10/A</option>
                      <option value="10b">10/B</option>
                      <option value="9a">9/A</option>
                      <option value="9b">9/B</option>
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none">▾</span>
                  </div>
                </div>
                {/*Email cím */}
                <div className="mb-5">
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Iskolai email cím
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 text-sm select-none"><Mail /></span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kovacs.anna.400@dszcbaross.edu.hu"
                      className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    />
                  </div>
                </div>
    
                {/*Jelszó*/}
                <div className="mb-6">
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Jelszó
                  </label>
                  <div className="flex items-center group bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
                    <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors duration-200 shrink-0" />
                    {hidePassword ? <input
                      type='password'
                      value={psw}
                      required
                      onChange={(e) => setPsw(e.target.value)}
                      placeholder="Legalább 8 karakter"
                      className="flex-1 bg-transparent py-3.5 px-3 text-sm text-slate-200 placeholder-slate-600 outline-none"
                    /> :
                    <input
                      type='text'
                      value={psw}
                      required
                      onChange={(e) => setPsw(e.target.value)}
                      placeholder="Legalább 8 karakter"
                      className="flex-1 bg-transparent py-3.5 px-3 text-sm text-slate-200 placeholder-slate-600 outline-none"
                    />}
                    {hidePassword ? <EyeClosed onClick={() => setHidePassword(!hidePassword)} className="w-4 h-4 text-slate-500 shrink-0 cursor-pointer hover:text-blue-500 transition-colors duration-200" /> : <Eye onClick={() => setHidePassword(!hidePassword)} className="w-4 h-4 text-slate-500 shrink-0 cursor-pointer hover:text-blue-500 transition-colors duration-200" />}
                
                  </div>
                </div>
    
         
                <div className="flex items-start gap-3 mb-7">
                  <button
                    onClick={() => setChecked(!checked)}
                    className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-md border transition-all duration-200 flex items-center justify-center ${
                      checked
                        ? "bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/30"
                        : "bg-slate-800 border-slate-600 hover:border-slate-400"
                    }`}
                  >
                    
                  </button>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    A regisztrációval elfogadom a{" "}
                    <a href="#" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                      Baross Piac Általános Szerződési Feltételeit
                    </a>{" "}
                    és az{" "}
                    <a href="#" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                      Adatkezelési Tájékoztatót
                    </a>
                    .
                  </p>
                </div>
    
      
                <button
                  type='submit'
                  className={`w-full py-4 rounded-xl text-sm font-semibold text-white tracking-wide transition-all duration-200 ${
                    checked
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  Regisztráció →
                </button>
                </form>
    
           
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-slate-800" />
                  <span className="text-xs text-slate-600">vagy</span>
                  <div className="flex-1 h-px bg-slate-800" />
                </div>
    
           
                <p className="text-center text-xs text-slate-500">
                  Már van fiókod?{" "}
                  <a href="#" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    Jelentkezz be
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
    )
  }

export default App
