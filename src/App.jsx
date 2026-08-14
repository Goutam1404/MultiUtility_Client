import React from "react";
import { Route, Routes } from "react-router-dom";
// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout.jsx";
import {
  NotePage,
  ClockPage,
  TodoPage,
  HomePage,
  AuthFormPage,
} from "./pages/index.js";
import { TodoProvider } from "./contexts/TodoContext.jsx";
import { NoteProvider } from "./contexts/NoteContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ServiceProvider } from "./contexts/ServiceContext.jsx";

function App() {
  return (
    // <div className="bg-[#172842] min-h-screen py-5 px-20">
    //   <NavBar/>
    //   <main className="py-5">
    //   <TodoProvider>
    //     <TodoPage />
    //   </TodoProvider>
    //   </main>
    // </div>
    <ServiceProvider>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/todo"
              element={
                <TodoProvider>
                  <TodoPage />
                </TodoProvider>
              }
            />
            <Route
              path="/notes"
              element={
                <NoteProvider>
                  <NotePage />
                </NoteProvider>
              }
            />
            <Route
              path="/clock"
              element={
                <TodoProvider>
                  <ClockPage />
                </TodoProvider>
              }
            />
            <Route
              path="/login"
              element={
                <div>
                  <AuthFormPage isLogin={true} />
                </div>
              }
            />
            <Route path="/register" element={<AuthFormPage />} />
          </Route>
        </Routes>
        {/* Adding ToastContainer globally */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          // theme="colored" // Gives full-colour backgrounds to match status
        />
      </AuthProvider>
    </ServiceProvider>
  );
}

export default App;
