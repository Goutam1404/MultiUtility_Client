import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getUser, loginUser } from "../api/auth.js";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyUser = () => {
      try {
        const res = getUser();
        console.log(res.data);

        // setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };
    verifyUser();
  }, []);

  const register = async () => {};
  const login = async (email, password) => {
    console.log("Frontend for login", email, password);
    const data = await loginUser({ email, password });
    console.log(data.data.user);
    setUser(data.data.user)
  };
  const logout = async () => {};
  const remove = async () => {};

  const values = {
    register,
    login,
    logout,
    remove,
    user,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
