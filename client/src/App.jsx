import React, { useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import { TodoProvider } from "./contexts/TodoContext";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoList from "./components/TodoList";

const App = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            user ? (
              <TodoProvider>
                <TodoList />
              </TodoProvider>
            ) : (
              <div>Please login or register</div>
            )
          }
        />
      </Routes>
    </div>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
