import API from "./Api.js";

const createNote = async (noteData) => await API.post("/note/create", noteData);
const pinNote = async (noteId) => await API.post(`/note/pin/${noteId}`);
const getAllNote = async () => await API.get("/note/");
const editNote = async (noteId, noteData) =>
  await API.post(`/note/edit/${noteId}`, noteData);
const deleteNote = async (noteId) => await API.delete(`/note/delete/${noteId}`);

export { createNote, getAllNote, editNote, deleteNote };
