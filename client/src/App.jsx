import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import FileUpload from "./FileUpload";
function App() { 

  return (
    <Router>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Login</Link>
        <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
        <Link to="/upload">File Upload</Link>
      </nav>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/upload" element={<FileUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
