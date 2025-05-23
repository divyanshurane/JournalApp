import React, { useState } from 'react';

export default function NewEntryForm({ onAddEntry }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    onAddEntry({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-5">Add New Journal Entry</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-1">Title</label>
        <input 
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter a title for your entry"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="content" className="block text-gray-700 text-sm font-medium mb-1">Content</label>
        <textarea 
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-36"
          placeholder="Write your journal entry here..."
          required
        />
      </div>
      <div className="flex items-center justify-end">
        <button 
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
          disabled={!title || !content} // Disable button if fields are empty
        >
          Add Entry
        </button>
      </div>
    </form>
  );
} 