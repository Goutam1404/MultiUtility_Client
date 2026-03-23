import React, { useState } from "react";
import { useNote } from "../contexts/NoteContext";

function NotesDisplay({ notes }) {
  const { updateNote, deleteNote } = useNote();
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalMode, setModalMode] = useState(null);

  // console.log("Notes: " + notes.id + ": " + notes.title);

  return (
    <>
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-[#1e293b] w-full max-w-2xl rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
            <div className="p-4">
              {modalMode === "read" ? (
                <>
                  <div className="max-h-[80vh] overflow-y-auto">
                    <h1 className="text-3xl font-bold text-white mb-4">
                      {selectedNote.title}
                    </h1>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {selectedNote.content}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-white mb-4">
                    Edit Blog
                  </h2>
                  <input
                    className="w-full bg-[#0f172a] text-white p-3 rounded mb-4"
                    defaultValue={selectedNote.title}
                    onChange={(e) => (selectedNote.title = e.target.value)}
                  />
                  <textarea
                    className="w-full bg-[#0f172a] text-white p-3 rounded h-48"
                    defaultValue={selectedNote.content}
                    onChange={(e) => (selectedNote.content = e.target.value)}
                  />
                </>
              )}
            </div>

            {/* FOOTER BUTTONS FOR MODAL */}
            <div className="flex justify-between mx-5 mb-4">
              <button
                onClick={() => setModalMode(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                close
              </button>
              {modalMode === "read" ? (
                <div>
                  <div className="flex gap-3">
                    <button
                      className="bg-green-600 px-3 py-2 rounded-md hover:bg-green-700 cursor-pointer"
                      onClick={() => {
                        setSelectedNote(selectedNote);
                        setModalMode("edit");
                      }}
                    >
                      Edit{" "}
                    </button>
                    <button
                      className="bg-red-600 px-3 py-2 rounded-md hover:bg-red-700"
                      onClick={() => {
                        deleteNote(selectedNote._id || selectedNote.id);
                        setModalMode(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md cursor-pointer"
                  onClick={() => setModalMode(null)}
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Normal display of cards with notes */}
      <div className="mx-auto px-2 sm:px-4 py-2 sm:py-2 rounded-md bg-[#030b16] shadow-xl ">
        <div>
          <h2 className="font-bold text-xl sm:text-2xl sm:my-1 line-clamp-1 sm:line-clamp-none sm:mb-2">
            {notes.title}
          </h2>
          <div className=" py-2">
            <p className="line-clamp-2 sm:line-clamp-3 max-w-2xl mb-2">
              {notes.content}
            </p>
            <div className="flex sm:flex-row justify-between items-center pt-2  sm:pt-4">
              <span
                onClick={() => {
                  setSelectedNote(notes);
                  setModalMode("read");
                }}
                className="cursor-pointer hover:underline-offset-1 "
              >
                Read More
              </span>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                  className="rounded bg-green-700 hover:bg-green-800 cursor-pointer px-2 sm:px-3 py-1 duration-200"
                  onClick={() => {
                    setSelectedNote(notes);
                    setModalMode("edit");
                  }}
                >
                  Edit
                </button>
                <button
                  className="rounded bg-red-700 hover:bg-red-800 cursor-pointer px-2 sm:px-3 py-1"
                  onClick={() => deleteNote(notes._id || notes.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotesDisplay;
