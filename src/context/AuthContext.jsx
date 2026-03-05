/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check cookie on every mount (page refresh)
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/cookie-check",
          {},
          { withCredentials: true }
        );
        if (res.data.message === "Login Successful") {
          const u = res.data.user;
          sessionStorage.setItem("myUser", JSON.stringify(u));
          setUser(u);
        }
      } catch (err) {
        sessionStorage.removeItem("myUser");
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  const login = (userData) => {
    sessionStorage.setItem("myUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem("myUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};