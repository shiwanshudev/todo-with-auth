import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:5000/api/todos", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setTodos(response.data);
        });
    }
  }, [user]);

  const addTodo = async (text) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:5000/api/todos",
      { text },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setTodos([...todos, response.data]);
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const updateTodo = async (id, updatedTodo) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:5000/api/todos/${id}`,
      updatedTodo,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
