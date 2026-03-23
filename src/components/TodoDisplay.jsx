import React, { useEffect, useState } from "react";
import { useTodo } from "../contexts/TodoContext.jsx";
import { editTask, getAllTask, removeTodo } from "../api/todo.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import TaskDisplay from "./TaskDisplay.jsx";

function TodoDisplay({ todo }) {
  const { user } = useAuth();
  const { updateTodo, deleteTodo, toggleCompleted } = useTodo();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(user ? "" : todo.todo);
  const [task, setTask] = useState();
  const todoId = todo._id;
  // console.log(todo.title);
  // console.log(todoId);
  // console.log(todo);

  useEffect(() => {
    if (user) {
      const getTasks = async (todoId) => {
        if (todoId) {
          const res = await getAllTask(todoId);
          // console.log(res.data.data.tasks);
          setTask(res.data.data.tasks);
        }
      };
      getTasks(todoId);
    }
  }, [todo]);

  const editTodo = async (taskId, todoMsg) => {
    if (user) {
      await editTask(todoId, taskId, todoMsg);
    } else {
      await updateTodo(todoId, todoMsg);
    }
    setIsTodoEditable(false);
  };
  const toggleStatus = (taskId = "") => {
    toggleCompleted(todo._id, taskId);
  };

  // console.log(task);

  return user ? (
    <div>
      <div
        className={`flex flex-wrap flex-col bg-[#131920] p-3 my-5 sm:m-2 sm:p-5 rounded-2xl gap-y-3`}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bold">{todo.title}</h2>
          <button
            className=" text-white/50 text-sm transition-all duration-200 hover:text-white/90 hover:font-medium cursor-pointer"
            onClick={async () => {
              alert(`Deleting ${todo.title}`);
              deleteTodo(todoId);
            }}
          >
            Delete
          </button>
        </div>
        {task && task.length > 0 ? (
          task.map((item, index) => (
            <div key={item._id} className="w-full">
              <TaskDisplay todoItem={item} todoId />
            </div>
          ))
        ) : (
          <>
            <span className="text-gray-600 flex mt-2 text-center">
              Yet no task added
            </span>
          </>
        )}
      </div>
    </div>
  ) : (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        isTodoEditable ? "border-black/10 px-2" : "border-transparent"
      } ${todo.isCompleted ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.isCompleted}
        onChange={toggleStatus}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.isCompleted ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.isCompleted) return;
          if (isTodoEditable) {
            editTodo("", todoMsg);
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.isCompleted}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo._id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoDisplay;
