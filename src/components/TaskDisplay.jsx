import React, { useState } from "react";
import { editTask, getAllTask } from "../api/todo";
import { useTodo } from "../contexts/TodoContext";

function TaskDisplay({ todoItem, todoId }) {
  const { updateTodo, deleteTodo, toggleCompleted } = useTodo();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todoItem.task);
  const [toggle, setToggle] = useState(todoItem.isCompleted);
  //   const [task, setTask] = useState();

  // console.log(todo.title);
  // console.log(todoId);
  // console.log(todo);

  const editTodo = async (taskId, todoMsg) => {
    await editTask(todoId, taskId, todoMsg);
    setIsTodoEditable(false);
  };

  const toggleStatus = (taskId) => {
    toggleCompleted(todoId, taskId);
  };

  return (
    <div
      className={`flex items-center border border-black/10 rounded-lg pl-2 pr-1 py-1.5 gap-x-1 shadow-sm shadow-white/50 duration-300  text-black ${
        isTodoEditable ? "border-black/10 px-2" : "border-transparent"
      } ${toggle ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={toggle}
        onChange={() => {
          //   todoItem.isCompleted = !todoItem.isCompleted;
          setToggle((prev) => !prev);
          toggleStatus(todoItem._id);
        }}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${toggle ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-5 h-5 sm:w-8 sm:h-8 rounded-lg text-sm border border-black/10 justify-center items-center  shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todoItem.isCompleted) return;

          if (isTodoEditable) {
            editTodo(todoItem._id, todoMsg);
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todoItem.isCompleted}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-5 h-5 sm:w-8 sm:h-8 rounded-lg text-sm border border-black/10 justify-center items-center  hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todoItem._id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TaskDisplay;
