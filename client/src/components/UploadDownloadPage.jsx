import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadDownload = () => {
  const [downloadLink, setDownloadLink] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
  const handleUploadClick = () => {
    navigate('/upload'); 
  };

  // Handles the file download logic
  const handleDownloadClick = (e) => {
    e.preventDefault();
    setError('');
     if (!downloadLink.trim()) {
      setError('Please paste a valid file link.');
      return;
    }

     try {
      window.open(downloadLink, '_blank', 'noopener,noreferrer');
    } catch (err) {
      setError('Could not open the link. Please check if it is correct.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-400 via-cyan-500 to-blue-500 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 space-y-8">
        
        {/* Upload Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Upload a New File</h2>
          <p className="text-gray-500 mt-2">Share your files with the world securely.</p>
          <button
            onClick={handleUploadClick}
            className="mt-4 w-full max-w-xs mx-auto bg-cyan-600 text-white py-3 rounded-lg font-medium hover:bg-cyan-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            Upload File
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>

        {/* Download Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Download a File</h2>
          <p className="text-gray-500 mt-2">Paste a shared link below to download the file.</p>
          <form onSubmit={handleDownloadClick} className="mt-4 flex flex-col items-center gap-4">
            <div className="w-full max-w-xs">
              <label htmlFor="download-link" className="sr-only">
                File Link
              </label>
              <input
                id="download-link"
                type="url"
                value={downloadLink}
                onChange={(e) => setDownloadLink(e.target.value)}
                placeholder="https://yourapp.com/share/..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full max-w-xs bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Download File
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDownload;
