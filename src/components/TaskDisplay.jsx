import React, { useState } from "react";
import { editTask, getAllTask, removeTask } from "../api/todo";
import { useTodo } from "../contexts/TodoContext";

function TaskDisplay({ todoItem, todoId, deleteTask, editTaskText }) {
  const { updateTodo, toggleCompleted } = useTodo();
  const [todo, setTodo] = useState(todoItem);
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todoItem.task);
  const [toggle, setToggle] = useState(todoItem.isCompleted);
  //   const [task, setTask] = useState();
  // console.log(todo.title);
  // console.log(todoId);
  // console.log(todo);

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
      <div className="flex gap-1">
        <button
          className="inline-flex w-6 h-6 rounded-lg text-sm border border-black/10 justify-center items-center hover:bg-[#b99dcf] cursor-pointer shrink-0 disabled:opacity-50"
          onClick={() => {
            if (todoItem.isCompleted) return;

            if (isTodoEditable) {
              editTaskText  (todoItem._id, todoMsg);
              setIsTodoEditable(false);
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={todoItem.isCompleted}
        >
          {isTodoEditable ? "📁" : "✏️"}
        </button>
        {/* Delete Todo Button */}
        <button
          className="inline-flex w-6 h-6 rounded-lg text-sm border border-black/10 justify-center items-center cursor-pointer hover:bg-[#b99dcf] shrink-0"
          onClick={() => deleteTask(todoId, todoItem._id)}
        >
          ❌
        </button>
      </div>
    </div>
  );
}

export default TaskDisplay;
