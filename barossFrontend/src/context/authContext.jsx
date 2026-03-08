import  { createContext, useState, useEffect, useContext } from 'react';
import api from '../config/api.js';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{console.log(user)},[user])

    const loadUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await api.get('/user/me');
           
                setUser(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        else {console.log("nincs token")
          
        }
        setLoading(false);
    };
    
    useEffect(() => {
        
        loadUser();
    }, []);
    
    const login = async (email, psw) => {
        const response = await api.post('/user/login', { email, psw });
        console.log(response)
        localStorage.setItem('token', response.data.token);
        await loadUser()
        

        return response;
    };
    
    const register = async (fullname, email, psw, userClass) => {
        const response = await api.post('/user/register', { fullname, email, psw, userClass });
        console.log('Registration response:', response);
        return response;
    };
    
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
    };

    
    return (
        <AuthContext.Provider value={{ user, login, register, logout, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);