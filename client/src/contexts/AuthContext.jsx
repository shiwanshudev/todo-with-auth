import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("TOKEN AUTH CONTEXT", token);
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/user", {
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
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      username,
      password,
    });
    localStorage.setItem("token", response.data.token);
  };

  const register = async (username, password) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        username,
        password,
      }
    );
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
