import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import NoteModal from "../../components/NoteModel";
import axios from "axios";
import NoteCard from "../../components/NoteCard";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  // Fetch Notes
  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/note/notes", {
        withCredentials: true,
      });
      setNotes(data.notes);
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const closeModal = () => setIsModalOpen(false);

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/note/add",
        { title, description },
        { withCredentials: true }
      );
      if (response.data.success) {
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.log("Error adding note:", error);
    }
  };

  const onUpdate = async (updatedNote) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/note/update/${updatedNote._id}`,
        { title: updatedNote.title, description: updatedNote.description },
        { withCredentials: true }
      );
      if (response.data.success) {
        fetchNotes();
      }
    } catch (error) {
      console.log("Error updating note:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/note/delete/${id}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        fetchNotes();
      }
    } catch (error) {
      console.log("Error deleting note:", error);
    }
  };

  return (
    <>
      <Navbar />
      {notes.length === 0 ? (
        <p className="text-center mt-10">No Notes</p>
      ) : (
        <div className="flex flex-wrap gap-5 mx-5 my-10">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed right-10 bottom-10 bg-gray-100 px-5 py-5 rounded-full text-4xl shadow-lg"
      >
        +
      </button>

      {isModalOpen && <NoteModal closeModal={closeModal} addNote={addNote} />}
    </>
  );
};

export default Home;
