import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useService } from "../contexts/ServiceContext";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
  const isDark = true;
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [guest, setGuest] = useState(true); //later will be changed with isLoggedIn from user
  const [isOpen, setIsOpen] = useState(false);
  const sections = [
    { id: "todo", label: "ToDo", icon: "✅" },
    { id: "notes", label: "Notes", icon: "📃" },
    { id: "clock", label: "Clock", icon: "🕐" },
  ];
  // console.log(user);

  const handleAlert = () => {
    alert("These features are not available currently");
  };

  const { service, setService } = useService();
  const handleService = () => {
    // console.log(service);
    const serviceState = !service;
    if (serviceState) {
      alert("Guest mode off");
    } else {
      alert("In guest mode now");
    }
    setService(serviceState);
  };

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate("/");
      alert("logout try");
    }, 2000);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 shadow-md hover:shadow-xl  transition-colors rounded-md ${
          isDark ? "bg-[#060c16]" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-2 py-4 flex flex-wrap gap-2  justify-between items-center">
          <div>
            <Link
              to=""
              className=" px-4 py-3 bg-gray-800 rounded-lg mr-2 text-white font-medium transition-all hover:bg-gray-900 cursor-pointer duration-200"
            >
              MultiUtility
            </Link>
          </div>
          {/* mid links */}
          {!service && (
            <div
              className={`hidden md:flex flex-wrap gap-2 max-w-screen justify-center items-center mx-auto `}
            >
              {sections.map((section) => (
                <NavLink
                  key={section.id}
                  to={section.id}
                  className={({ isActive }) =>
                    `px-4 py-2 bg-gray-700 rounded-lg mr-2 text-gray-200 font-medium transition-all lg:hover:bg-gray-900 hover:text-orange-300 ${
                      isActive
                        ? "text-orange-300 bg-gray-900"
                        : " text-gray-200 "
                    } cursor-pointer duration-200`
                  }
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.label}
                </NavLink>
              ))}
            </div>
          )}
          {/* buttons */}
          {!user ? (
            <div className="hidden md:flex items-center">
              {/* <button
              className="px-5 py-2 bg-gray-600 rounded-lg mr-2 text-white font-medium transition-all hover:bg-gray-800 cursor-pointer duration-200"
              onClick={handleAlert}
            >
              {isDark ? "☀" : "🌙"}
            </button> */}

              {service && (
                <div>
                  <Link
                    to="login"
                    className="flex-1 py-3 px-4 text-center bg-blue-600 rounded-lg mr-2 text-white font-medium transition-all hover:bg-blue-800 cursor-pointer duration-200"
                    // onClick={() => navigate("/login")}
                  >
                    Login
                  </Link>
                  <Link
                    to="register"
                    className="px-4 py-3 text-center bg-gray-600 rounded-lg mr-2 text-white font-medium transition-all hover:bg-gray-800 cursor-pointer duration-200"
                    // onClick={handleAlert}
                    // onClick={() => navigate("/register")}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              {guest && (
                <Link
                  className={`px-3 py-3 flex-1 text-center ${
                    service
                      ? "bg-indigo-900 hover:bg-indigo-950 "
                      : "bg-green-700 hover:bg-green-800"
                  } rounded-lg text-white font-medium transition-all cursor-pointer duration-200`}
                  onClick={handleService}
                >
                  {service ? "Guest" : "User"}
                </Link>
              )}
            </div>
          ) : (
            <div className="text-white hidden md:flex bg-gray-700 w-10 h-10 items-center justify-center rounded-full relative group">
              {user.name[0].toUpperCase()}
              <div className="absolute w-30 hidden group-hover:block top-0 right-0 z-10 rounded pt-10">
                <ul className="list-none bg-gray-700 p-2 text-sm m-0 ">
                  <li
                    className="py-1 px-2 pr-10 hover:bg-gray-600 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Log out
                  </li>
                  {/* {!user.isAccountVerified && (
              <li
                className="px-2 py-1 border-b-2 hover:bg-gray-600 cursor-pointer"
                onClick={sendOtp}
              >
                Verify Email
              </li>
            )}
            <li
              className="py-1 px-2 pr-10 hover:bg-gray-600 cursor-pointer"
              onClick={() => resetPassOtp(user.email)}
            >
              Reset Password
            </li> */}
                </ul>
              </div>
            </div>
          )}

          {/* HAMBURGER BUTTON - Only visible on mobile */}
          <button
            className="md:hidden p-2 text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Dynamic Hamburger Icon */}
            <div className="space-y-1.5">
              <span
                className={`block w-6 h-0.5 bg-gray-600 transition-transform ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-gray-600 transition-opacity ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-gray-600 transition-transform ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* MOBILE MENU - Conditional Rendering */}
        <div
          className={`absolute max-w-md border-b md:hidden top-full left-0 w-full z-40 
      transition-all duration-300 ease-in-out bg-black/60 backdrop-blur-md ${
        isOpen
          ? "translate-y-0 opacity-100 visible"
          : "-translate-y-4 opacity-0 invisible"
      } ${
            isDark ? "bg-[#0d1624] border-gray-800" : "bg-white border-gray-100"
          }`}
        >
          <div
            className={`px-4 pt-2 pb-6 flex flex-col gap-4 border-t ${
              isDark ? "border-gray-800" : "border-gray-100"
            }`}
          >
            {sections.map((section) => (
              <NavLink
                key={section.id}
                to={section.id}
                onClick={() => setIsOpen(!isOpen)} // Close menu on click
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg  hover:bg-gray-900 ${
                    isActive ? "bg-gray-900" : "bg-gray-700"
                  } text-gray-200`
                }
              >
                <span className="mr-4 text-xl">{section.icon}</span>
                {section.label}
              </NavLink>
            ))}

            {/* mobile view buttons */}
            {!user ? (
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-700">
                {/* <button
                onClick={handleAlert}
                className="w-full py-3 bg-gray-700 hover:bg-gray-800 rounded-lg text-white cursor-pointer"
              >
                Toggle Theme {isDark ? "☀" : "🌙"}
              </button> */}
                <button
                  className={`px-4 py-3 text-center ${
                    service
                      ? "bg-violet-900 hover:bg-violet-950 "
                      : "bg-green-700 hover:bg-green-800"
                  } rounded-lg mr-2 text-white font-medium transition-all  cursor-pointer duration-200`}
                  onClick={handleService}
                >
                  {service ? "User" : "Guest"}
                </button>
                {service && (
                  <div className="flex gap-2">
                    <Link
                      to="login"
                      className="flex-1 py-3 text-center bg-blue-600 hover:bg-blue-800 rounded-lg text-white"
                      onClick={() => {
                        setGuest(false);
                      }}
                    >
                      Login
                    </Link>
                    <Link
                      to="register"
                      className="flex-1 py-3 text-center bg-gray-700 hover:bg-gray-800 rounded-lg text-white"
                      onClick={handleService}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-700">
                <button
                  className="flex-1 py-3 text-center bg-gray-700 hover:bg-gray-800 rounded-lg text-white"
                  onClick={handleService}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
