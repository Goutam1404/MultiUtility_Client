import React from "react";
import { TodoProvider } from "./contexts/TodoContext.jsx";
import { Route, Routes } from "react-router-dom";

import Layout from "./Layout.jsx";
import {
  NotePage,
  ClockPage,
  TodoPage,
  HomePage,
  AuthFormPage,
} from "./pages/index.js";
import { NoteProvider } from "./contexts/NoteContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

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
    </AuthProvider>
  );
}

export default App;
