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
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-900 text-white text-sm flex w-full items-center justify-between p-4 shadow-lg fixed">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold hover:text-gray-300">
            Home
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-gray-300 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-gray-300 transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
      <div>
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
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <h1 className="font-extrabold text-3xl lg:text-5xl text-blue-800 mb-2">
                      SecureTasks
                    </h1>
                    <p className="mb-4 text-lg">
                      Please{" "}
                      <Link
                        to="/login"
                        className="underline text-blue-600 hover:text-blue-800 transition duration-300"
                      >
                        Login
                      </Link>{" "}
                      or{" "}
                      <Link
                        to="/register"
                        className="underline text-blue-600 hover:text-blue-800 transition duration-300"
                      >
                        Register
                      </Link>
                    </p>
                  </div>
                </div>
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
