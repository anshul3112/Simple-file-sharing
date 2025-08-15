import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import UploadDownloadPage from "./components/UploadDownloadPage.jsx";
import Upload from "./components/FileUpload.jsx";
import './App.css'
import ErrorPage from "./components/ErrorPage.jsx";

function App() {
  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-500"
      : "text-gray-500 hover:text-blue-600 transition-colors duration-200";

  // useNavigate must be used inside a component that is a descendant of Router.
  // We'll create a small inner component for the navigation to use the hook.
  const Navigation = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/users/logout', {
          method: 'POST',
          credentials: 'include', // Sends cookies with the request
        });

        if (response.ok) {
          // Redirect to the login page after successful logout
          navigate('/');
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("An error occurred during logout:", error);
      }
    };

    return (
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            FileForge
          </NavLink>
          <div className="flex items-center space-x-6 md:space-x-8">
            <NavLink to="/" className={navLinkClasses}>
              Login
            </NavLink>
            <NavLink to="/register" className={navLinkClasses}>
              Register
            </NavLink>
            <NavLink to="/home" className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/upload" className={navLinkClasses}>
              Upload
            </NavLink>
            <button onClick={handleLogout} className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
              Logout
            </button>
          </div>
        </nav>
      </header>
    );
  };

  return (
    <Router>
      <div className="bg-gradient-to-br from-blue-50 via-white to-white min-h-screen font-sans">
        {/*Navigation Bar*/}
        <Navigation />

        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<UploadDownloadPage />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 