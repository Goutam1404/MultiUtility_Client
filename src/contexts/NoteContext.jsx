import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { createNote, editNote, getAllNote, deleteOne } from "../api/note.js";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const { user } = useAuth();
  const presetNote = [
    {
      _id: 1,
      title: "Welcomes to Note section",
      content:
        "Thank you for our application. In these section of notes you can create notes of your own and it will be stored in your storage. In coming days there will be a feature for storing it in our server. Until then enjoy the features.Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi dolorem molestiae enim! Laboriosam, optio? Velit quo minus, saepe esse quod repellat consectetur ad provident maxime est quibusdam, expedita rerum porro?",
    },
  ];
  const [notes, setNotes] = useState(() => {
    try {
      const savedNote = localStorage.getItem("notes");
      const parsedNote = JSON.parse(savedNote);
      return parsedNote
        ? parsedNote.length > 0
          ? parsedNote
          : presetNote
        : [];
    } catch (error) {
      console.error("Error in fetching todo from storage", error);
      return [];
    }
  });

  useEffect(() => {
    const fetchNote = async () => {
      if (user) {
        try {
          const resNotes = await getAllNote();
          console.log(resNotes.data.data);

          // Note data API returns returns in resNotes.data.data
          setNotes(resNotes.data.data);
          // console.log(notes);
          
        } catch (err) {
          console.error("Fetch failed", err);
        }
      } else {
        const saved = localStorage.getItem("notes");
        setNotes(saved ? JSON.parse(saved) : presetNote);
      }
    };

    fetchNote();
  }, [user]);

  useEffect(() => {
    if (!user && notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes, user]);

  const addNote = async (noteData) => {
    //If user is logged in or
    if (user) {
      try {
        const response = await createNote(noteData);
        console.log(response);
        
        setNotes((prevNotes) => [response.data, ...prevNotes]);
        alert("Note created Successfully");
      } catch (error) {
        alert("Error in creating note");
        console.error(error);
      }
    } else {
      const newNote = { ...noteData, _id: Date.now() };
      setNotes((prevNote) => [newNote, ...prevNote]);
    }
  };

  const updateNote = async (noteId, note) => {
    if (user) {
      try {
        await editNote(noteId, note);
        alert("Note Updated Successfully");
      } catch (error) {
        alert("Failed to update the note");
      }
    } else {
      setNotes((prevNote) =>
        prevNote.map((prev) => (prev._id === noteId ? { ...prev, note } : prev))
      );
    }
  };

  const deleteNote = async (noteId) => {
    console.log("Delteing note");
    if (user) {
      try {
        await deleteOne(noteId);
        setTimeout(() => {
          alert("Deleted the note");
        }, 2000);
      } catch (error) {
        alert("Failed to delete");
      }
    } else {
      setNotes((prevNote) => prevNote.filter((prev) => prev._id !== noteId));
    }
  };

  const value = {
    notes,
    addNote,
    updateNote,
    deleteNote,
  };
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export const useNote = () => useContext(NoteContext);
