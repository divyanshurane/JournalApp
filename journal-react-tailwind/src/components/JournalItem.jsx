import React from 'react';

export default function JournalItem({ entry, onDelete, onEdit }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200 transition-shadow hover:shadow-lg">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{entry.title}</h3>
        <div className="flex space-x-2 flex-shrink-0 ml-4">
          <button 
            onClick={() => onEdit(entry)} 
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 focus:outline-none"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(entry.id)} 
            className="text-sm font-medium text-red-400 hover:text-red-800 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-gray-600 text-sm whitespace-pre-wrap break-words">{entry.content}</p>
    </div>
  );
} 