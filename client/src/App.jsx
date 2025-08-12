import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
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

  return (
    <Router>
      <div className="bg-gradient-to-br from-blue-50 via-white to-white min-h-screen font-sans">
        {/*Navigation Bar*/}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">

            <NavLink to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              FileShare
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
            </div>
          </nav>
        </header>

        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<UploadDownloadPage />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/*" element={<ErrorPage/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
