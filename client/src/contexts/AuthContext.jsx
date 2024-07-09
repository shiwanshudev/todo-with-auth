import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("TOKEN AUTH CONTEXT", token);
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setUser(response.data))
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, []);

  const login = async (username, password) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}api/auth/login`,
      {
        username,
        password,
      }
    );
    localStorage.setItem("token", response.data.token);
    window.location.href = "/";
  };

  const register = async (username, password) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}api/auth/register`,
      {
        username,
        password,
      }
    );
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
    window.location.href = "/";
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
