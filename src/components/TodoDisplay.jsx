import React, { useEffect, useState } from "react";
import { useTodo } from "../contexts/TodoContext.jsx";
import {
  createTask,
  editTask,
  getAllTask,
  removeTask,
  removeTodo,
} from "../api/todo.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import TaskDisplay from "./TaskDisplay.jsx";

function TodoDisplay({ todo }) {
  const { user } = useAuth();
  const { updateTodo, deleteTodo, toggleCompleted } = useTodo();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(user ? "" : todo.todo);
  const [task, setTask] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  // const [addStatus, ]
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

  const handleAddTask = async () => {
    if (!newTaskText.trim()) return;

    try {
      // 1. Call your API (Passing the parent todoId and the new text)
      // Assuming your API returns the newly created task object
      const res = await createTask(todoId, newTaskText);

      // 2. Update the UI immediately
      setTask((prev) => [...prev, res.data.task]);

      // 3. Reset and close
      setNewTaskText("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  const editTaskText = async (taskId, todoMsg) => {
    await editTask(todoId, taskId, todoMsg);
    
  };

  const editTodo = async (taskId, todoMsg) => {
    if (user) {
      await editTask(todoId, taskId, todoMsg);
    } else {
      await updateTodo(todoId, todoMsg);
    }
    setIsTodoEditable(false);
  };

  const deleteTask = async (todoId, taskId) => {
    try {
      await removeTask(todoId, taskId);
      setTask((prev) => prev.filter((element) => element._id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const toggleStatus = (taskId = "") => {
    toggleCompleted(todo._id, taskId);
  };

  // console.log(task);

  return user ? (
    <div>
      <div
        className={`flex flex-wrap flex-col bg-[#131920] py-2 px-2 my-5 sm:m-2 sm:p-3 rounded-2xl gap-y-3`}
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
              <TaskDisplay
                todoItem={item}
                deleteTask={deleteTask}
                editTaskText={editTaskText}
                todoId
              />
            </div>
          ))
        ) : (
          <>
            <span className="text-gray-600 flex mt-2 text-center">
              Yet no task added
            </span>
          </>
        )}
        {/* Adding button and check the div for the width of the button */}
        <button
          className="ml-1 px-2 cursor-pointer rounded bg-white/10 hover:bg-white/20 text-start text-white/80 max-w-fit"
          onClick={() => setIsModalOpen(true)}
        >
          Add +
        </button>
      </div>
      {/* --- THE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-4">
          <div className="bg-[#030b16] w-full max-w-md rounded-xl border border-slate-700 shadow-2xl px-3 py-5 sm:p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Task of {todo.title}
            </h3>

            {/* Existing Items (Scrollable list for context) */}
            <div className="max-h-40 overflow-y-auto mb-4 border-b border-slate-700 pb-2">
              {task.map((t) => (
                <div key={t._id} className="text-slate-300 text-md py-1">
                  • {t.task}
                </div>
              ))}
            </div>

            {/* New Input */}
            <div className="mb-4 sm:mb-6">
              <label className="text-xs text-slate-400 uppercase font-bold">
                New Task Item
              </label>
              <input
                autoFocus
                type="text"
                className="w-full bg-white/10 text-white p-3 rounded-lg border border-slate-600 focus:border-blue-500 outline-none mt-2"
                placeholder="Enter item name..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}
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
