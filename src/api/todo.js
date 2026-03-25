import API from "./Api.js";

const createTodo = async (title) => await API.post("/todo/create",{title});
const getAllTodo = async () => await API.get("/todo");
const editTodo = async (todoId, updatedData) =>
  await API.patch(`/todo/${todoId}`, updatedData);
const removeTodo = async (todoId) => await API.delete(`/todo/${todoId}`);

//task
const createTask = async (todoId, taskText) =>
  await API.post(`/todo/task/${todoId}`, { taskText }); // task will only store taskText

const getAllTask = async (todoId) => await API.get(`/todo/task/${todoId}`);

const editTask = async (todoId, taskId, taskText) =>
  await API.patch(`/todo/task/edit/${todoId}/${taskId}`, {taskText});

const toggleTask = async (todoId, taskId) =>
  await API.patch(`/todo/task/toggle/${todoId}/${taskId}`);

const removeTask = async (todoId, taskId) =>
  await API.delete(`/todo/task/${todoId}/${taskId}`);

export {
  createTodo,
  getAllTodo,
  editTodo,
  removeTodo,
  createTask,
  getAllTask,
  editTask,
  removeTask,
  toggleTask,
};
