import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for potential future nav links

export default function Header({ onLogout }) { // Accept onLogout prop
  return (
    <header className="bg-white shadow-md w-full sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
          My Journal
        </Link>
        <div>
          {/* Conditionally render Logout button */} 
          {onLogout && (
             <button 
              onClick={onLogout} 
              className="bg-red-400 hover:bg-red-600 text-white text-sm font-medium py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Logout
            </button>
          )}
          {/* Placeholder for other potential nav links */} 
          {/* <Link to="/profile" className="text-gray-600 hover:text-indigo-600 ml-4">Profile</Link> */} 
        </div>
      </nav>
    </header>
  );
} 