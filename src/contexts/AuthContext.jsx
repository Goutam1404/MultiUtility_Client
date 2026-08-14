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
  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await getUser();
        console.log(res.data.userInfo);
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
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to register");
      console.log("Failed to register", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    // console.log("Frontend for login", email, password);
    try {
      console.log("In login");

      const data = await loginUser({ email, password });
      // console.log(data);
      // console.log(data.data.userInfo);
      setUser(data.data.userInfo);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      console.log("Error in login:" + error);

      // alert("Failed to log in");
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log("In log Out");
      // setLoading(true);
      await logOutUser();
      setUser(null); // 👈 Clear local user state immediately
      toast.info("Logged out successfully");
      navigate("/");
    } catch (error) {
      // alert("Failed to log out");
      toast.error("Failed to log out");
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    try {
      setLoading(true);
      await deleteAccount();
      setUser(null);
      toast.success("Account deleted permanently");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete account");
    } finally {
      setLoading(false);
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
  // {
  //   loading && (
  //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] text-white font-medium text-lg">
  //       Processing, please wait...
  //     </div>
  //   );
  // }
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
