import React from "react";
import { useTodo } from "../contexts/TodoContext.jsx";
import { useNote } from "../contexts/NoteContext.jsx";

function DashBoardPage() {
  const { todo } = useTodo();
  const { notes } = useNote();
  return (
    <div>
      <div className="flex">
        {todo ? (
          <div>
            <h2>Pinned Todo</h2>
            <button>View All</button>
          </div>
        ) : (
          <p>No pinned task</p>
        )}
      </div>
      
      <div className="flex">
        {notes ? (
          <div>
            <h2>Pinned notes</h2>
            <button>View All</button>
          </div>
        ) : (
          <p>No pinned note</p>
        )}
      </div>
    </div>
  );
}

export default DashBoardPage;
