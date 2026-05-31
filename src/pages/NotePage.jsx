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
      <div className="w-full mx-auto  shadow-md rounded-lg flex flex-col md:flex-row justify-between gap-6 items-start">
        <div className="mb-5 sm:mb-0 w-full md:w-[400px] lg:w-[450px] shrink-0">
          <NoteForm />
        </div>
        <div className="flex-1 w-full flex flex-col gap-4">
          {notes && notes.length > 0 ? (
            notes.map((note, index) => (
              <div key={note._id || note.id} className="w-full h-fit">
                <NotesDisplay notes={note} />
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              No notes found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotePage;
