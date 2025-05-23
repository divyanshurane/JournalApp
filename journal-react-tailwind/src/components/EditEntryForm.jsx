import React, { useState, useEffect } from 'react';

export default function EditEntryForm({ entry, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
    } else {
      // Reset form if entry becomes null (modal closes)
      setTitle('');
      setContent('');
    }
  }, [entry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    onSave({ ...entry, title, content });
  };

  if (!entry) return null;

  return (
    // Modal overlay
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity flex justify-center items-center z-50 p-4">
      {/* Modal Panel */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-auto relative transform transition-all"
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" className="text-xl font-semibold text-gray-700 mb-5">Edit Journal Entry</h2>
        <div className="mb-4">
          <label htmlFor="edit-title" className="block text-gray-700 text-sm font-medium mb-1">Title</label>
          <input 
            type="text"
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="edit-content" className="block text-gray-700 text-sm font-medium mb-1">Content</label>
          <textarea 
            id="edit-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-40"
            required
          />
        </div>
        {/* Modal Actions */}
        <div className="mt-6 flex items-center justify-end space-x-3">
          <button 
            type="button" 
            onClick={onCancel} 
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
             disabled={!title || !content} // Disable button if fields are empty
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
} 