import React, { useState } from "react";

const NoteModal = ({ closeModal, addNote }) => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(title, description);
  };
  return (
    <div className="max-w-md mx-auto w-80 bg-white shadow-md rounded-lg p-6 mt-20 backdrop-blur-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 ">Add New Note</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Note Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter note title"
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Note Description
          </label>
          <textarea
            id="description"
            rows="4"
            placeholder="Enter note description"
            className="mt-2 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteModal;
