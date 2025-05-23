import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import JournalList from './components/JournalList';
import NewEntryForm from './components/NewEntryForm';
import EditEntryForm from './components/EditEntryForm';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import {
  getJournalEntries,
  addJournalEntry,
  deleteJournalEntry,
  updateJournalEntry
} from './services/api';

// Helper function to check for token
const checkAuthToken = () => !!localStorage.getItem('token');

// Component to protect routes
function ProtectedRoute({ isAuthenticated }) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

// Main application component managing state and routing
function JournalApp({ onLogout }) {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      // Check for token again before fetching
      if (!checkAuthToken()) {
        setError("Authentication required. Please login.");
        setLoading(false);
        // No need to navigate here, ProtectedRoute handles it
        return; 
      }
      const response = await getJournalEntries();
      setEntries(response.data);
    } catch (err) {
      console.error("Error fetching entries:", err);
      setError('Failed to load journal entries.');
      if (err.response && err.response.status === 401) {
        setError("Authentication failed or token expired. Please login again.");
        onLogout(); // Trigger logout if unauthorized
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntry = async (newEntryData) => {
    try {
      const response = await addJournalEntry(newEntryData);
      setEntries(prevEntries => [response.data, ...prevEntries]);
      setError(null); // Clear previous errors on success 
    } catch (err) {
      console.error("Error adding entry:", err);
      setError('Failed to add entry.');
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await deleteJournalEntry(id);
      setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
      setError(null);
    } catch (err) {
      console.error("Error deleting entry:", err);
      setError('Failed to delete entry.');
    }
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
  };

  const handleSaveEntry = async (updatedEntryData) => {
    try {
      await updateJournalEntry(updatedEntryData.id, updatedEntryData);
      setEntries(prevEntries =>
        prevEntries.map(entry =>
          entry.id === updatedEntryData.id ? updatedEntryData : entry
        )
      );
      setEditingEntry(null);
      setError(null);
    } catch (err) { 
      console.error("Error updating entry:", err);
      setError('Failed to save changes.');
    }
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onLogout={onLogout} />
      
      <main className="flex-grow w-full bg-gradient-to-br from-blue-50 via-white to-indigo-100 shadow-inner">
        {loading && <p className="text-center text-indigo-600 py-10">Loading entries...</p>}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 mx-4 md:mx-8" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {!loading && !error?.includes('Authentication') && (
          <div className="p-4 md:p-8">
            <div className="mb-8">
              <NewEntryForm onAddEntry={handleAddEntry} />
            </div>
            <JournalList 
              entries={entries} 
              onDelete={handleDeleteEntry} 
              onEdit={handleEditEntry} 
            />
          </div>
        )}
      </main>

      <EditEntryForm 
        entry={editingEntry} 
        onSave={handleSaveEntry} 
        onCancel={handleCancelEdit} 
      />

      <footer className="text-center text-gray-500 text-sm p-4 mt-auto">
        My Journal App © 2024
      </footer>
    </div>
  );
}

// Main App component handling authentication state and routing setup
function App() {
  // Initialize auth state based on token existence
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthToken());
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    // Optionally navigate to '/' here if not already handled by LoginPage
    // navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page
  };

  // Use effect to potentially check token validity on app load (optional)
  // useEffect(() => {
  //   // Example: Make a request to a protected endpoint like /user
  //   // If it fails with 401, call handleLogout()
  //   const verifyToken = async () => { ... };
  //   if (isAuthenticated) verifyToken();
  // }, [isAuthenticated]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes */} 
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<JournalApp onLogout={handleLogout} />} />
        {/* Add other protected routes here if needed */}
        {/* e.g., <Route path="/profile" element={<ProfilePage />} /> */}
      </Route>

      {/* Catch-all or Not Found Route (Optional) */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
    </Routes>
  );
}

export default App;
