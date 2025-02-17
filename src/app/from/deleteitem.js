import React, { useState } from "react";

const DeleteItemModal = ({ isOpen, onDelete, onClose, itemId }) => {


  const handleDelete = () => {
    onDelete(itemId);
    console.log("id is "+itemId )
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4">Confirm Deletion</h2>
        <p className="text-center mb-4">Are you sure you want to delete this item?</p>
        {/* <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a reason for deletion (optional)"
        /> */}

        <div className="flex justify-between gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


export default DeleteItemModal;