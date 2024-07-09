import React, { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";

const Todo = ({ todo }) => {
  const { deleteTodo, updateTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleUpdate = async () => {
    await updateTodo(todo._id, { text: newText });
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-2">
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      ) : (
        <p className="text-gray-900">{todo.text}</p>
      )}
      <div className="flex items-center justify-end mt-2 space-x-2">
        <button
          onClick={() => deleteTodo(todo._id)}
          className="text-red-600 border border-red-600 text-sm py-1 px-3 rounded-md hover:bg-red-600 hover:text-white transition"
        >
          Delete
        </button>
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-indigo-600 text-white text-sm py-1 px-3 rounded-md hover:bg-indigo-700 transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-indigo-600 border border-indigo-600 text-sm py-1 px-3 rounded-md hover:bg-indigo-600 hover:text-white transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Todo;
