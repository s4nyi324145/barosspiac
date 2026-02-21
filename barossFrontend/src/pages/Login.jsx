import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { Mail,Lock, Eye, EyeClosed} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '../config/api'
import { useToast } from '../context/toastContext'
export default function Login(){

     const [email, setEmail] = useState("")
     const [psw, setPsw] = useState("")
     const [hidePassword, setHidePassword] = useState(true);
     const { showError, showSuccess } = useToast()
     const [errorField, setErrorField] = useState([])
     const inputRef = useRef(null);
     const navigate = useNavigate();


     useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }


    }, []);

    useEffect(() => {console.log(errorField);
    },[errorField])


     const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await api.post('/user/login', {email,psw})
          localStorage.setItem('token', response.data.token);
          showSuccess("Sikeres bejelentkezés!")
          setTimeout(() => {
            navigate('/')
          }, 1500);
          
        }
        catch (error) {
          showError(error.response?.data?.message || "Hiba történt a bejelentkezés során.")
          console.error(error.response)
          setErrorField(error.response?.data?.errorField || "")
        }
      }

        return (
    
        <div className="min-h-screen bg-slate-950 flex items-center  justify-center px-4 py-12 relative overflow-hidden">
    
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
    
            
                <h1 className="text-2xl font-bold text-white mb-1">Bejelentkezés</h1>
                <p className="text-slate-400 text-sm mb-8">Jelentkezz be a fiókodba</p>
    
                <form onSubmit={(e) => handleSubmit(e)}>
                
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
                      ref={inputRef}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if(errorField.includes("email")) setErrorField("");
                      }}
                      placeholder="kovacs.anna.400@dszcbaross.edu.hu"
                      className={`w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${errorField.includes("email") ? 'border-red-600' : ''}`}
                    />
                  </div>
                </div>
    
                {/*Jelszó*/}
                <div className="mb-6">
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Jelszó
                  </label>
                  <div className={`flex items-center group ${errorField.includes("psw") ? 'border-red-600' : ''} bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200`}>
                    <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors duration-200 shrink-0" />
                    {hidePassword ? <input
                      type='password'
                      value={psw}
                      required
                      onChange={(e) => {
                        setPsw(e.target.value);
                        if(errorField.includes("psw")) setErrorField([]);
                      }}
                      placeholder="Add meg a jelszavad"
                      className={`flex-1 bg-transparent py-3.5 px-3 text-sm text-slate-200 placeholder-slate-600 outline-none`}
                    /> :
                    <input
                      type='text'
                      value={psw}
                      required
                      onChange={(e) => {
                        setPsw(e.target.value);
                        if(errorField.includes("psw")) setErrorField([]);
                      }}
                      placeholder="Add meg a jelszavad"
                      className={`flex-1 bg-transparent py-3.5 px-3 text-sm text-slate-200 placeholder-slate-600 outline-none `}
                    />}
                    {hidePassword ? <EyeClosed onClick={() => setHidePassword(!hidePassword)} className="w-4 h-4 text-slate-500 shrink-0 cursor-pointer hover:text-blue-500 transition-colors duration-200" /> : <Eye onClick={() => setHidePassword(!hidePassword)} className="w-4 h-4 text-slate-500 shrink-0 cursor-pointer hover:text-blue-500 transition-colors duration-200" />}
                
                  </div>
                  
                </div>
    
         
            
    
      
                <button
                  type='submit'
                
                  className={`w-full py-4 rounded-xl text-sm font-semibold text-white tracking-wide transition-all duration-200 ${
                    "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"                  
                  }`}
                >
                  Bejelentkezés →
                </button>
                </form>
    
           
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-slate-800" />
                  <span className="text-xs text-slate-600">vagy</span>
                  <div className="flex-1 h-px bg-slate-800" />
                </div>
    
           
                <p className="text-center text-xs text-slate-500">
                  Még nincs fiókod?{" "}
                  <a href="# " onClick={() => navigate('/register')} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                     Hozz létre egyet!
                  </a>
                </p>
                  
          </div>
        </div>
    )
}