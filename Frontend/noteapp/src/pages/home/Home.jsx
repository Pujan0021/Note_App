import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import NoteModal from "../../components/NoteModel";
import NoteCard from "../../components/NoteCard";
import axios from "axios";
import { useAuth } from "../../context/ContextProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  const { isAuthenticated } = useAuth(); // consume from context

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/note/auth/check",
        { withCredentials: true }
      );

      if (data.authenticated) {
        fetchNotes();
      } else {
        setNotes([]);
      }
    } catch (error) {
      setNotes([]);
    }
  };

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/note/notes", {
        withCredentials: true,
      });
      setNotes(data.notes || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error("Error Fetching Notes!");
    }
  };

  const addNote = async (title, description) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/note/add",
        { title, description },
        { withCredentials: true }
      );

      if (data.success) {
        setNotes((prev) => [...prev, data.note]);
        closeModal();
        toast.success("Note added successfully.");
      }
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("Error adding note!", error.message);
    }
  };

  const onUpdate = async (updatedNote) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/note/update/${updatedNote._id}`,
        { title: updatedNote.title, description: updatedNote.description },
        { withCredentials: true }
      );

      if (data.success) {
        setNotes((prev) =>
          prev.map((note) =>
            note._id === updatedNote._id ? { ...note, ...updatedNote } : note
          )
        );
        toast.success("Note updated successfully.");
      }
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Error updating note!", error.message);
    }
  };

  const onDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/note/delete/${id}`,
        { withCredentials: true }
      );

      if (data.success) {
        setNotes((prev) => prev.filter((note) => note._id !== id));
        toast.success("Note deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Error deleting note!", error.message);
    }
  };

  const filterNotes = (notes, query) => {
    if (!query) return notes;
    const searchQuery = query.toLowerCase();
    return notes.filter((note) =>
      note.title.toLowerCase().includes(searchQuery)
    );
  };

  const filteredNotes = filterNotes(notes, query);

  useEffect(() => {
    checkAuth();
  }, [isAuthenticated]);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Navbar query={query} setQuery={setQuery} />

      {isAuthenticated ? (
        filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-40">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-10 shadow-sm text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-20 text-gray-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-700">
                No notes yet
              </h2>
              <p className="text-gray-500 mt-2">
                Start by adding your first note to keep track of ideas.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                + Add Note
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mx-10 my-10 justify-items-center">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        )
      ) : (
        <div className="flex  flex-col items-center justify-center mt-40">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-10 shadow-sm text-center w-80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2zm0 0v1m0-4a9 9 0 110 18 9 9 0 010-18z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-700">
              Please log in
            </h2>
            <p className="text-gray-500 mt-2">
              You need to be authenticated to view and manage your notes.
            </p>
            <Link
              to="/login"
              className="text-white hover:text-blue-300 transition-transform hover:scale-105"
            >
              <button className="mt-6 px-6 cursor-pointer py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition ">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed right-10 bottom-10 bg-gray-100 px-5 py-5 rounded-full text-4xl shadow-lg"
        >
          +
        </button>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm z-50"
          onClick={closeModal}
        >
          <div className=" p-6" onClick={(e) => e.stopPropagation()}>
            <NoteModal closeModal={closeModal} addNote={addNote} />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
