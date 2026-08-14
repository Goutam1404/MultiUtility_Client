import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  deleteAccount,
  getUser,
  loginUser,
  logOutUser,
  registerUser,
} from "../api/auth.js";
import { useService } from "./ServiceContext.jsx";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { service, setService } = useService();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await getUser();
        // console.log(res.data.userInfo);
        setUser(res.data.userInfo);
        setLoading(false);
      } catch (err) {
        // setService(true);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const register = async (username, email, password) => {
    try {
      const data = await registerUser({ username, email, password });
      console.log(data);
    } catch (error) {
      alert("Failed to register");
      console.log("Failed to register", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    // console.log("Frontend for login", email, password);
    try {
      const data = await loginUser({ email, password });
      console.log(data.data.userInfo);
      // console.log(data);
      setUser(data.data.userInfo);
    } catch (error) {
      alert("Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log("In log Out");
      await logOutUser();
    } catch (error) {
      alert("Failed to log out");
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    try {
      await deleteAccount();
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    register,
    login,
    logout,
    remove,
    user,
    loading,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
