# 🚀 CodeCollab - Real-time Collaborative Code Editor

A powerful, real-time collaborative code editor that allows multiple developers to code together simultaneously. Perfect for technical interviews, pair programming, team collaborations, and remote coding sessions.

![CodeCollab Demo](https://img.shields.io/badge/Status-Ready_for_Interview-green)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?logo=react&logoColor=white)

## ✨ Features

### 🎯 Core Features
- **Real-time Collaboration** - Multiple users can code together simultaneously
- **10+ Programming Languages** - Full syntax highlighting support
- **Live Code Execution** - Run code directly in the browser
- **User Presence** - See who's online and their cursor positions
- **Room Management** - Create, join, and manage coding sessions
- **No Installation Required** - Works directly in the browser
- **Dashboard** - Manage all your rooms in one place
- **Professional UI** - Dark theme with modern design

### 🛠 Technical Features
- **Monaco Editor** - Same editor used in VS Code
- **WebSocket Integration** - Real-time updates using Socket.io
- **JWT Authentication** - Secure user authentication
- **Responsive Design** - Works on desktop and mobile
- **RESTful API** - Clean backend architecture

## 🏗 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io Client** - Real-time communication
- **Monaco Editor** - Professional code editor
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js (v16)
- MongoDB (local)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AyushPq777/codecollab.git
   cd codecollab
Backend Setup

bash
cd server
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/codecollab" > .env
echo "JWT_SECRET=your_super_secret_jwt_key" >> .env
echo "JWT_EXPIRE=30d" >> .env
echo "CLIENT_URL=http://localhost:3000" >> .env

# Start backend
npm run dev
Frontend Setup (in new terminal)

bash
cd client
npm install
npm run dev
Access the Application

Frontend: http://localhost:3000

Backend: http://localhost:5000

📖 Usage Guide
🎪 For Interviews
Interviewer: Create a room and share the Room ID

Candidate: Join with the Room ID and start coding

Collaborate: Watch code changes in real-time

Evaluate: Run code and see results together

👥 For Team Collaboration
Create Room: Click "Create New Room"

Invite Team: Share Room ID or direct link

Code Together: Multiple developers can edit simultaneously

Debug: Run code and troubleshoot together

🎓 For Learning
Teachers: Demonstrate concepts with live coding

Students: Follow along and practice in real-time

Mentors: Provide immediate feedback and guidance

🗂 Project Structure
text
codecollab/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   └── contexts/       # React contexts
│   └── package.json
├── server/                 # Node.js Backend
│   ├── controllers/        # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── socket/             # Socket.io handlers
│   └── server.js
└── README.md


🔧 API Endpoints
Authentication
POST /api/auth/register - User registration

POST /api/auth/login - User login

GET /api/auth/me - Get current user

Rooms
POST /api/rooms - Create new room

GET /api/rooms/:roomId - Get room details

GET /api/rooms/public - Get public rooms

GET /api/rooms/user/my-rooms - Get user's rooms


🎯 Supported Languages
JavaScript - Full execution support

Python - Smart execution simulation

Java - Execution simulation

C++ - Execution simulation

TypeScript - Full execution support

And 10+ more languages with syntax highlighting


👨‍💻 Development
Running in Development Mode
bash
# Backend (Terminal 1)
cd server
npm run dev

# Frontend (Terminal 2) 
cd client
npm run dev
Building for Production
bash
# Frontend
cd client
npm run build

# Backend
cd server
npm start

📞 Support
For issues and questions:

Check the browser console for errors

Ensure MongoDB is running

Verify all environment variables are set