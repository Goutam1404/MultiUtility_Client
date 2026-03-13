import React, { useEffect } from "react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { useAuth } from "../context/AuthContext";

function AuthFormPage({ isLogin = false }) {
  // const {isLogin, setIsLogin} = useState(false);
  const navigate = useNavigate();
//   const { user, login, register, resetPassOtp } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
//     console.log("Handle submit function in authform");

//     e.preventDefault();
//     if (!isLogin) {
//       await register(username, email, password);
//       // alert("Success! Now please login.");
//       navigate("/email-verify");
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } else {
//       try {
//         await login(email, password);
//         navigate("/home");
//         toast.success("Logged in successfully!");
//         navigate("/home");
//       } catch (error) {
//         console.error("Error in fetching data in login", error);
//         const message =
//           error.response?.data?.message ||
//           "Login failed. Please check your credentials.";
//         toast.error(message);
//         setEmail(email);
//         setPassword(password);
//       }
//     }
  };

  const handleResetPass = async () => {
  //   // await resetPassOtp(email);
  //   setTimeout(() => {
  //     navigate("/reset-password", { state: { email } });
  //   }, 3000);
  };

  // useEffect(() => {
  //   user && navigate("/home");
  // }, [user]);
  return (
    <div className="mt-10 bg-linear-to-br flex items-center justify-center text-gray-400 p-4">
      <div className="w-full max-w-md rounded-2xl bg-gray-800 p-4 sm:p-6  shadow-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-300">
            {isLogin ? "Login to your account" : "Create Account"}
          </h2>
          <p className="mt-2 text-gray-400">Please enter your details below</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-4">
          {!isLogin && (
            <div>
              {/* <label className="block pl-2 text-sm font-medium text-gray-400">
                Username
              </label> */}
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
                className="mt-1 w-full rounded-full bg-gray-700 p-3 outline-none transition focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          {/* email */}
          <div>
            {/* <label className="pl-2 block text-sm font-medium text-gray-400">
              Email
            </label> */}
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required={true}
              className="mt-1 w-full rounded-full bg-gray-700 p-3 outline-none transition focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* password */}
          <div>
            {/* <label className="pl-2 block text-sm font-medium text-gray-400">
              Password
            </label> */}
            <input
              type="text"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required={true}
              className="mt-1 w-full bg-gray-700 rounded-full p-3 outline-none transition focus:ring-2 focus:ring-blue-500"
            />
            {isLogin ? (
              <p
                className={`text-indigo-500 mt-2 text-sm pl-2 cursor-pointer w-fit ${
                  !email ? "pointer-events-none cursor-default" : ""
                }`}
                onClick={() => resetPassOtp(email)}
              >
                Forgot Password ?
              </p>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-linear-to-r from-indigo-400 to-indigo-700 py-3 font-semibold text-white transition hover:bg-linear-to-r hover:from-indigo-600 hover:to-indigo-900 active:scale-95 cursor-pointer"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        {!isLogin ? (
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Log in
            </button>
          </p>
        ) : (
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Sign up
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthFormPage;
