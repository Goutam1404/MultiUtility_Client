//Things to fix for todo
// todoTitle state need to be removed as these increases the database call 
//Bringing all the function implementation of todos to in these file

import { useEffect, useState, createContext, useContext } from "react";
import {
  createTodo,
  getAllTodo,
  editTodo,
  removeTodo,
  createTask,
  getAllTask,
  editTask,
  removeTask,
  toggleTask,
} from "../api/todo.js";
import { useAuth } from "./AuthContext.jsx";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { user } = useAuth();
  const [todoTitle,setTodoTitle]=useState("");
  const presetTodo = [
    {
      _id: 1,
      todo: "Starting of TODO application",
      completed: false,
    },
  ];

  const [todos, setTodos] = useState(
    !user
      ? () => {
          try {
            const savedTodo = localStorage.getItem("todos");
            const parsedTodo = JSON.parse(savedTodo);
            return parsedTodo
              ? parsedTodo.length > 0
                ? parsedTodo
                : ""
              : presetTodo;
          } catch (error) {
            console.error("Error in fetching todo", error);
            return [];
          }
        }
      : []
  );
  // console.log(todos);

  //Fetching data
  useEffect(() => {
    const loadTodos = async () => {
      try {
        if (user) {
          const allTodo = await getAllTodo();
          setTodos(allTodo.data.todos);
          // console.log(allTodo.data);

          // for (let todo of allTodo.todos) {
          //   const allTasks = await getAllTask(todo._id);
          //   // setTodos((prevTodo)=>[allTasks.data.data,...prevTodo])
          //   // allTasks.data.data.title-> title of each todoList,
          //   // allTasks.data.data.tasks[]-> all tasks inside the todo list
          //   console.log({ allTasks });
          // }
        } else {
          console.log("In setting todos in local storage", todos);
          localStorage.setItem("todos", JSON.stringify(todos));
        }
      } catch (error) {
        alert("Error in loading todo");
        console.error("Error in loading todo", error);
      }
    };
    loadTodos();
  }, [user,todoTitle]);

  //loading data from local storage for guest user
  useEffect(() => {
    if (!user) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, user]);


  const addTodo = async (todo) => {
    if (user) {
      try {
        const res = await createTodo(todo);
        setTodos((prev) => [res, ...prev]);
        setTodoTitle(todo);
      } catch (error) {
        alert("Error in creating note");
        console.error(error);
      }
    } else {
      const newTodo = { todo, _id: Date.now(), completed: false };
      setTodos((prev) => [newTodo, ...prev]);
      console.log(newTodo);
    }
  };

  const updateTodo = (todoId, todo) => {
    console.log(todo + " <=todo id=> " + todoId);

    setTodos((prev) =>
      prev.map((task) => (task._id === todoId ? { ...task, todo } : task))
    );
  };

  const deleteTodo = async (todoId) => {
    if (user) {
      await removeTodo(todoId);
      setTodoTitle("remove")
    } else {
      setTodos((prev) => prev.filter((task) => task._id !== todoId));
    }
  };

  const toggleCompleted = async (todoId, taskId) => {
    if (user) {
      await toggleTask(todoId, taskId);
    } else {
      setTodos((prev) =>
        prev.map((task) =>
          task._id === todoId
            ? { ...task, isCompleted: !task.isCompleted }
            : task
        )
      );
    }
  };

  const value = {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleCompleted,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => useContext(TodoContext);
