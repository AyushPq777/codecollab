import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Plus,
    Users,
    Clock,
    Settings,
    LogOut,
    Code2,
    Search,
    Filter
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        fetchUserRooms()
    }, [])

    const fetchUserRooms = async () => {
        try {
            // Simulated API call - replace with actual API
            setTimeout(() => {
                setRooms([
                    {
                        id: 1,
                        roomId: 'ABC123',
                        name: 'Interview Preparation',
                        language: 'javascript',
                        users: 3,
                        lastActive: '2024-01-15T10:30:00Z',
                        isPublic: true
                    },
                    {
                        id: 2,
                        roomId: 'DEF456',
                        name: 'Project Collaboration',
                        language: 'python',
                        users: 2,
                        lastActive: '2024-01-14T15:45:00Z',
                        isPublic: false
                    }
                ])
                setLoading(false)
            }, 1000)
        } catch (error) {
            toast.error('Failed to load rooms')
            setLoading(false)
        }
    }

    const createNewRoom = () => {
        const newRoomId = Math.random().toString(36).substring(2, 10).toUpperCase()
        navigate(`/editor/${newRoomId}`, {
            state: { username: user?.username || 'User' }
        })
    }

    const joinRoom = (roomId) => {
        navigate(`/editor/${roomId}`, {
            state: { username: user?.username || 'User' }
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-white">Loading Dashboard...</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Header */}
            <header className="glass border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 bg-gradient-to-r from-primary-500 to-blue-500 rounded-lg">
                                <Code2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                                <p className="text-gray-400">Welcome back, {user?.username}!</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={createNewRoom}
                                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
                            >
                                <Plus className="w-4 h-4" />
                                <span>New Room</span>
                            </button>

                            <button
                                onClick={logout}
                                className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="glass rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Total Rooms</p>
                                <p className="text-3xl font-bold text-white mt-2">{rooms.length}</p>
                            </div>
                            <div className="p-3 bg-primary-500/20 rounded-lg">
                                <Code2 className="w-6 h-6 text-primary-400" />
                            </div>
                        </div>
                    </div>

                    <div className="glass rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Active Users</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {rooms.reduce((acc, room) => acc + room.users, 0)}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-500/20 rounded-lg">
                                <Users className="w-6 h-6 text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div className="glass rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Public Rooms</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {rooms.filter(room => room.isPublic).length}
                                </p>
                            </div>
                            <div className="p-3 bg-green-500/20 rounded-lg">
                                <Settings className="w-6 h-6 text-green-400" />
                            </div>
                        </div>
                    </div>

                    <div className="glass rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Languages</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {new Set(rooms.map(room => room.language)).size}
                                </p>
                            </div>
                            <div className="p-3 bg-purple-500/20 rounded-lg">
                                <Clock className="w-6 h-6 text-purple-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rooms Section */}
                <div className="glass rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-white">Your Rooms</h2>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search rooms..."
                                        className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                                <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                                    <Filter className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {rooms.length === 0 ? (
                            <div className="text-center py-12">
                                <Code2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">No rooms yet</h3>
                                <p className="text-gray-400 mb-6">Create your first room to start collaborating</p>
                                <button
                                    onClick={createNewRoom}
                                    className="px-6 py-3 bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
                                >
                                    Create Your First Room
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {rooms.map((room) => (
                                    <div
                                        key={room.id}
                                        className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-slate-600/50 transition-colors cursor-pointer group"
                                        onClick={() => joinRoom(room.roomId)}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 bg-slate-700/50 rounded-lg group-hover:bg-slate-600/50 transition-colors">
                                                <Code2 className="w-6 h-6 text-primary-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                                                    {room.name}
                                                </h3>
                                                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                                                    <span>ID: {room.roomId}</span>
                                                    <span>•</span>
                                                    <span className="capitalize">{room.language}</span>
                                                    <span>•</span>
                                                    <span>{room.isPublic ? 'Public' : 'Private'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-6">
                                            <div className="text-right">
                                                <div className="flex items-center space-x-2 text-sm text-gray-400">
                                                    <Users className="w-4 h-4" />
                                                    <span>{room.users} users</span>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Last active: {new Date(room.lastActive).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard