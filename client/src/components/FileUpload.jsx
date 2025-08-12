import React, { useRef, useState, useEffect } from 'react';
// Assuming 'uploadFile' is a function you've defined to handle the API call
// import { uploadFile } from '../services/api'; 

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef();

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const upload = async () => {
      if (file) {
        setLoading(true);
        setError('');
        setResult('');
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          console.log("Uploading file:", file.name);
          // Simulate a network delay
          await new Promise(resolve => setTimeout(resolve, 1500)); 
          // Mock a successful response
          const mockResponse = { path: `https://yourapp.com/share/${Date.now()}` };
          setResult(mockResponse.path);

        } catch (err) {
          setError('Failed to upload file. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };
    upload();
  }, [file]);

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg text-center space-y-6">
        
        {/* SVG Upload Icon */}
        <div className="flex justify-center">
          <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Simple File Sharing</h1>
          <p className="mt-2 text-gray-600">Upload a file and share the download link instantly.</p>
        </div>

        {/* Upload Button */}
        <button
          onClick={onUploadClick}
          disabled={loading}
          className="w-full max-w-xs mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:bg-blue-300 flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            'Choose File'
          )}
        </button>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
          disabled={loading}
        />

        {/* Result/Link Display */}
        {result && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">Your file is ready! Copy the link below:</p>
            <a
              href={result}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium break-all hover:underline"
            >
              {result}
            </a>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default FileUpload;
