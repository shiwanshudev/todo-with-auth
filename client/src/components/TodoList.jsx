import React, { useState, useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import Todo from "./Todo";

const TodoList = () => {
  const { todos, addTodo } = useContext(TodoContext);
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTodo(text);
    setText("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Todo List
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Add a new todo"
          />
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Todo
          </button>
        </form>
        <div className="rounded-md shadow-sm">
          {todos.map((todo) => (
            <Todo key={todo._id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
