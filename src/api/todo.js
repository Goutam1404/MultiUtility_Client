import API from "./Api.js";

const createTodo = async (title) => await API.post("/todo/create");
const getAllTodo = async () => await API.get("/todo");
const editTodo = async (todoId, updatedData) =>
  await API.post(`/todo/${todoId}`, updatedData);
const deleteTodo = async (todoId) => await API.delete(`/todo/${todoId}`);

//task
const createTask = async (todoId, task) =>
  await API.post(`/todo/task/${todoId}`, task); // task will only store taskText
const getAllTask = async (todoId) => await API.get(`/todo/task/${todoId}`);
const editTask = async (todoId, taskId, updatedData) =>
  await API.post(`/todo/task/edit/${todoId}/${taskId}`, updatedData);
const toggleTask = async (todoId, taskId) =>
  await API.post(`/todo/task/toggle/${todoId}/${taskId}`);
const deleteTask = async (todoId, taskId) =>
  await API.delete(`/todo/task/${todoId}/${taskId}`);

export { createTask, getAllTask, editTask, deleteTask };
