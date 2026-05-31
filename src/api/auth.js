import API from "./Api.js";

//userCred will store data required for login or register
const registerUser = async ({ username, email, password }) =>
  await API.post("/user/register", { username, email, password }); 
const loginUser = async (userCred) => await API.post("/user/login", userCred);
const getUser = async () => await API.get("/user/user-info");
const logOutUser = async () => await API.post("/user/logout");
const deleteAccount = async () => await API.delete("/user/delete");

export { registerUser, loginUser, getUser, logOutUser, deleteAccount };
