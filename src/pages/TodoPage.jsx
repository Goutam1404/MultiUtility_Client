import React from "react";
import { useTodo } from "../contexts/TodoContext";
import TodoForm from "../components/TodoForm";
import TodoDisplay from "../components/TodoDisplay";
import { useAuth } from "../contexts/AuthContext";

function TodoPage() {
  const theme = true; //later will be taken from theme context
  const { todos } = useTodo();
  const { user } = useAuth();
  // console.log("Context Value:", todos);
  return (
    <div className={`min-h-screen py-2 sm:py-4`}>
      <h1 className="text-2xl font-bold text-center mb-2 sm:mb-4 mt-2">
        Manage Your Tasks
      </h1>
      <div
        className={`w-full ${
          user ? "" : "max-w-xl mx-auto bg-[#030b16] mt-10"
        } shadow-md rounded-lg px-2 sm:px-4 py-3 `}
      >
        <div className={`mb-4 ${user ? "max-w-xl mx-auto" : " "}`}>
          <TodoForm />
        </div>
        <div
          className={`${
            user ? "bg-[#030b16]  rounded-2xl p-2 sm:p-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 " : "flex mt-5 flex-wrap"
          } gap-y-3`}
        >
          {todos &&
            todos.map((todo, index) => (
              <div key={todo._id} className="w-full">
                <TodoDisplay todo={todo} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
