import { createContext, useState, useEffect, useContext } from "react";
import api from "../config/api.js";

{
  /*
  AuthContext provides authentication-related state and functions to the entire application. It manages user information, loading state, and provides functions for logging in, registering, and logging out users. It also automatically loads the user information on app initialization if a token is present in localStorage.
*/
}
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.get("/user/me");

        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("nincs token");
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);


{/* Login function that sends a POST request to the server with the user's email and password. If successful, it stores the received token in localStorage and loads the user information. It also returns the server response for further handling. */}
  const login = async (email, psw) => {
    const response = await api.post("/user/login", { email, psw });
    console.log(response);
    localStorage.setItem("token", response.data.token);
    await loadUser();

    return response;
  };

  {/* Register function that sends a POST request to the server with the user's information. It also returns the server response for further handling. */}
  const register = async (fullname, email, psw, userClass) => {
    const response = await api.post("/user/register", {
      fullname,
      email,
      psw,
      userClass,
    });
    console.log("Registration response:", response);
    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
