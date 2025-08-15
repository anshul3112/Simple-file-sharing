FileForge - A Secure File Sharing Platform 🚀
FileForge is a full-stack web application built with the MERN stack that allows users to securely upload, share, and download files. It features a clean user interface, robust authentication, and cloud-based file storage using Cloudinary.

## Core Features
User Authentication: Secure user registration and login using JWT (JSON Web Tokens).

Secure File Uploads: Upload files up to 100MB, which are stored securely on Cloudinary.

Access Control: Specify which users have permission to access and download your files.

Link-Based Downloads: Easily download files by pasting a shared link.

## Tech Stack
Frontend: React.js, Tailwind CSS, React Router

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

File Storage: Cloudinary

Authentication: JWT, bcrypt

## Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
Node.js and npm installed

MongoDB instance (local or cloud-based)

A Cloudinary account

### Installation
Clone the repository:

Bash

git clone https://github.com/your-username/FileForge.git
cd FileForge
Install backend dependencies:

Bash

cd server
npm install
Install frontend dependencies:

Bash

cd ../client
npm install
Set up environment variables:

In the server directory, create a .env file and add your MongoDB connection string, Cloudinary credentials, and JWT secret.

Code snippet

PORT=8000
MONGODB_URI=your_mongodb_uri
CORS_ORIGIN=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ACCESS_TOKEN_SECRET=your_jwt_secret
ACCESS_TOKEN_EXPIRY=1d
Run the application:

From the server directory, start the backend:

Bash

npm start
From the client directory, start the frontend:

Bash

npm start
The application will be available at http://localhost:3000.