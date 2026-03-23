import React from "react";
import { NoteForm, NotesDisplay } from "../components/index.js";
import { useNote } from "../contexts/NoteContext.jsx";

function NotePage() {
  const{notes}= useNote()
  return (
    <div className={` min-h-screen py-8  px-2 sm:px-5`}>
      <h1 className="text-2xl font-bold text-center mb-8 mt-2">
        Manage Your Notes
      </h1>
      <div className="w-full mx-auto  shadow-md rounded-lg flex flex-col sm:flex-row justify-between gap-5">
        <div className="mb-5 sm:mb-0 w-full max-w-md">
          <NoteForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {notes && notes.length > 0 ? (
            notes.map((note,index) => (
              <div key={note._id || note.id} className="w-full">
                <NotesDisplay notes={note} />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No notes found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotePage;
