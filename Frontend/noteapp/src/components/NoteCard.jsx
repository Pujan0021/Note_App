import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedDescription, setEditedDescription] = useState(note.description);

  const handleSave = () => {
    onUpdate({ ...note, title: editedTitle, description: editedDescription });
    setIsEditing(false);
  };

  return (
    <div className="w-64 rounded-md shadow-xl p-4 bg-white">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full border p-2 mb-2 rounded"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full border p-2 mb-2 rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white cursor-pointer px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 cursor-pointer text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold mb-1">{note.title}</h2>
          <p className="text-gray-700 mb-3">{note.description}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white cursor-pointer px-3 py-1 rounded"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDelete(note._id)}
              className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
