import React, { useState, useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import Todo from "./Todo";

const TodoList = () => {
  const { todos, addTodo } = useContext(TodoContext);
  const [text, setText] = useState("");

  const handleAdd = async () => {
    await addTodo(text);
    setText("");
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add Todo</button>
      <div>
        {todos.map((todo) => (
          <Todo key={todo._id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
