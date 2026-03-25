import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";
import { useAuth } from "../contexts/AuthContext";

function TodoForm() {
  const { user } = useAuth();
  const [todo, setTodo] = useState("");
  // const [task, setTask] = useState("");
  const [inputStatus, setInputStatus] = useState(false);
  const { addTodo } = useTodo();
  const add = (e) => {
    e.preventDefault();
    console.log(todo);
    if (!todo) {
      alert("Enter the todo name to add");
      return;
    } else addTodo(todo);
    setTodo("");
    // setTask("");
  };

  return user ? (
    <form className=" bg-white/20 rounded-xl" onSubmit={add}>
      {inputStatus ? (
        <>
          <input
            type="text"
            placeholder="Todo Name"
            className="w-full text-lg rounded-b-lg px-3 outline-none duration-150  py-1.5"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          {/* <input
            type="text"
            placeholder="write a task"
            className="w-full   rounded-b-lg px-3 outline-none duration-150  py-1.5"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          /> */}
          <div className="flex justify-between items-center p-1 mx-2">
            <button
              type="submit"
              className="rounded-r-lg text-md p-1 hover:text-white duration-150 text-white/40 shrink-0 cursor-pointer"
            >
              + Add Todo
            </button>
            <div>
              {/* <button
                className="px-2 hover:bg-white/11 hover:rounded cursor-pointer"
                onClick={() => setInputStatus(false)}
              >
                Save
              </button> */}
              <button
                className="px-2 hover:bg-white/11 hover:rounded cursor-pointer"
                onClick={() => setInputStatus(false)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Create a Todo"
            className="w-full rounded-t px-3 outline-none transition-all duration-200  py-1.5"
            value={todo}
            onClick={() => setInputStatus(true)}
            onChange={(e) => setTodo(e.target.value)}
          />
        </>
      )}
    </form>
  ) : (
    <form className="flex" onSubmit={add}>
      <input
        type="text"
        placeholder="write a task"
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 hover:bg-green-700 duration-150 text-white shrink-0 cursor-pointer"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
