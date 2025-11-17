import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { SocketProvider } from './contexts/SocketContext'
import { AuthProvider } from './contexts/AuthContext'
import Landing from './pages/Landing'
import Editor from './pages/Editor'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import Footer from './components/UI/Footer'  // Add this import
import './index.css'

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/editor/:roomId" element={<Editor />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
            <Footer />  {/* Add Footer here */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1e293b',
                  color: '#f8fafc',
                  border: '1px solid #334155'
                },
                success: {
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#f8fafc',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#f8fafc',
                  },
                },
              }}
            />
          </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
  )
}

export default App