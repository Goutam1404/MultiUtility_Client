import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function NavBar() {
  const isDark = true;
   const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const sections = [
    { id: "todo", label: "ToDo", icon: "✅" },
    { id: "notes", label: "Notes", icon: "📃" },
    { id: "clock", label: "Clock", icon: "🕐" },
  ];

  const handleAlert = () => {
    alert("These features are not available currently");
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
              className=" px-4 py-2 bg-gray-800 rounded-lg mr-2 text-white font-medium transition-all hover:bg-gray-900 cursor-pointer duration-200"
            >
              MultiUtility
            </Link>
          </div>
          {/* mid links */}
          <div
            className={`hidden md:flex flex-wrap gap-2 max-w-screen justify-center items-center mx-auto `}
          >
            {sections.map((section) => (
              <NavLink
                key={section.id}
                to={section.id}
                className={({ isActive }) =>
                  `px-4 py-2 bg-gray-700 rounded-lg mr-2 text-gray-200 font-medium transition-all lg:hover:bg-gray-900 hover:text-orange-300 ${
                    isActive ? "text-orange-300 bg-gray-900" : " text-gray-200 "
                  } cursor-pointer duration-200`
                }
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </NavLink>
            ))}
          </div>
          {/* buttons */}
          <div className="hidden md:flex">
            <button
              className="px-5 py-1 bg-gray-600 rounded-lg mr-2 text-white font-medium transition-all hover:bg-gray-800 cursor-pointer duration-200"
              onClick={handleAlert}
            >
              {isDark ? "☀" : "🌙"}
            </button>
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
                onClick={() => setIsOpen(false)} // Close menu on click
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

            <div className="flex flex-col gap-2 pt-4 border-t border-gray-700">
              <button
                onClick={handleAlert}
                className="w-full py-3 bg-gray-700 hover:bg-gray-800 rounded-lg text-white cursor-pointer"
              >
                Toggle Theme {isDark ? "☀" : "🌙"}
              </button>
              <div className="flex gap-2">
                <Link
                  to="login"
                  className="flex-1 py-3 text-center bg-blue-600 hover:bg-blue-800 rounded-lg text-white"
                  // onClick={handleAlert}
                >
                  Login
                </Link>
                <Link
                  to="register"
                  className="flex-1 py-3 text-center bg-gray-700 hover:bg-gray-800 rounded-lg text-white"
                  // onClick={handleAlert}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
