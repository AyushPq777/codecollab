import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Code2,
    Users,
    Zap,
    Github,
    Shield,
    Rocket,
    ArrowRight,
    Star,
    LogOut,
    User
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import LoginModal from '../components/Auth/LoginModal'
import RegisterModal from '../components/Auth/RegisterModal'

const Landing = () => {
    const [roomId, setRoomId] = useState('')
    const [username, setUsername] = useState('')
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const navigate = useNavigate()
    const { user, logout, isAuthenticated } = useAuth()

    const createRoom = () => {
        if (!username.trim()) {
            if (user?.username) {
                // Use logged-in user's username
                const newRoomId = Math.random().toString(36).substring(2, 10).toUpperCase()
                navigate(`/editor/${newRoomId}`, { state: { username: user.username } })
                return
            }
            toast.error('Please enter your name')
            return
        }
        const newRoomId = Math.random().toString(36).substring(2, 10).toUpperCase()
        navigate(`/editor/${newRoomId}`, { state: { username } })
    }

    const joinRoom = () => {
        if (!roomId.trim()) {
            toast.error('Please enter room ID')
            return
        }

        const displayName = user?.username || username
        if (!displayName.trim()) {
            toast.error('Please enter your name')
            return
        }

        navigate(`/editor/${roomId}`, { state: { username: displayName } })
    }

    const handleLogout = () => {
        logout()
        setUsername('')
    }

    const features = [
        // ... keep your existing features array
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation */}
            <nav className="glass border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-r from-primary-500 to-blue-500 rounded-lg">
                                <Code2 className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold gradient-text">CodeCollab</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            {isAuthenticated ? (
                                <>
                                    {/* User is logged in - show user info and logout */}
                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center space-x-2 text-sm text-gray-300">
                                            <User className="w-4 h-4" />
                                            <span>Welcome, {user.username}!</span>
                                        </div>
                                        <button
                                            onClick={() => navigate('/dashboard')}
                                            className="px-4 py-2 text-sm bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                                        >
                                            Dashboard
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="px-4 py-2 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* User is not logged in - show auth buttons */}
                                    <button
                                        onClick={() => setShowLogin(true)}
                                        className="px-4 py-2 text-sm font-medium text-white hover:text-primary-300 transition-colors"
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        onClick={() => setShowRegister(true)}
                                        className="px-6 py-2 bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 rounded-lg font-medium text-white transition-all duration-200 transform hover:scale-105"
                                    >
                                        Get Started
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium">
                            <Star className="w-4 h-4 mr-2 fill-current" />
                            Real-time Collaborative Coding Platform
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Code Together.
                        <span className="block gradient-text">Build Faster.</span>
                    </h1>

                    <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Collaborate with your team in real-time using our powerful code editor.
                        Perfect for interviews, pair programming, and remote team coding sessions.
                    </p>

                    <div className="max-w-2xl mx-auto glass rounded-2xl p-8 mb-16">
                        <div className="space-y-4">
                            {/* Username input - only show if not logged in */}
                            {!isAuthenticated && (
                                <input
                                    type="text"
                                    placeholder="Enter your display name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            )}

                            <button
                                onClick={createRoom}
                                className="w-full bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                            >
                                <Rocket className="w-5 h-5" />
                                <span>Create New Room</span>
                            </button>

                            <div className="flex items-center my-6">
                                <div className="flex-1 h-px bg-gray-600"></div>
                                <span className="px-4 text-gray-400 text-sm">OR</span>
                                <div className="flex-1 h-px bg-gray-600"></div>
                            </div>

                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="Enter room ID"
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                                    className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent uppercase"
                                />
                                <button
                                    onClick={joinRoom}
                                    className="px-8 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center space-x-2"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                    <span>Join</span>
                                </button>
                            </div>

                            {/* Show logged in user info */}
                            {isAuthenticated && (
                                <div className="text-center text-sm text-gray-400 mt-4">
                                    Joining as: <span className="text-primary-400 font-medium">{user.username}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Features Grid - keep your existing features */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="glass rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 group"
                        >
                            <div className="text-primary-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Stats Section - keep your existing stats */}
                <div className="mt-20 glass rounded-2xl p-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-white mb-2">10K+</div>
                            <div className="text-gray-400">Developers</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-2">50K+</div>
                            <div className="text-gray-400">Sessions</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-2">20+</div>
                            <div className="text-gray-400">Languages</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                            <div className="text-gray-400">Uptime</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals - only show if not authenticated */}
            {!isAuthenticated && (
                <>
                    <LoginModal
                        isOpen={showLogin}
                        onClose={() => setShowLogin(false)}
                        onSwitchToRegister={() => {
                            setShowLogin(false)
                            setShowRegister(true)
                        }}
                    />

                    <RegisterModal
                        isOpen={showRegister}
                        onClose={() => setShowRegister(false)}
                        onSwitchToLogin={() => {
                            setShowRegister(false)
                            setShowLogin(true)
                        }}
                    />
                </>
            )}
        </div>
    )
}

export default Landing