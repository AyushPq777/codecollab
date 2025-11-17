import React, { useState, useEffect, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { Play, Users, Copy, Share2, Code2, LogOut, Monitor, Cpu } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useSocket } from '../contexts/SocketContext'
import UserList from '../components/Editor/UserList'
import OutputPanel from '../components/Editor/OutputPanel'
import LanguageSelector from '../components/Editor/LanguageSelector'

const CodeEditor = () => {
    const { roomId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const { socket, isConnected } = useSocket()

    const username = location.state?.username || 'Anonymous'
    const editorRef = useRef(null)

    const [code, setCode] = useState('// Welcome to CodeCollab!\n// Start coding together...\n\nconsole.log("Hello World!");')
    const [language, setLanguage] = useState('javascript')
    const [output, setOutput] = useState('')
    const [users, setUsers] = useState([])
    const [isRunning, setIsRunning] = useState(false)
    const [isConnectedToRoom, setIsConnectedToRoom] = useState(false)

    // SIMPLIFIED: Only use socket connection
    useEffect(() => {
        if (!socket || !isConnected) {
            console.log('Waiting for socket connection...')
            return
        }

        console.log('Socket connected, joining room:', roomId)

        // Join room via sockets (this should create the room automatically)
        socket.emit('join-room', {
            roomId,
            user: { username, id: Date.now().toString() }
        })

        // Socket event handlers
        const handleRoomState = (data) => {
            console.log('✅ Room state received:', data)
            setCode(data.code || code)
            setLanguage(data.language || 'javascript')
            setUsers(data.users || [])
            setIsConnectedToRoom(true)
            toast.success(`Joined room ${roomId}`)
        }

        const handleCodeUpdate = (data) => {
            if (data.updatedBy !== socket.id) {
                setCode(data.code)
            }
        }

        const handleLanguageUpdate = (data) => {
            setLanguage(data.language)
            if (data.updatedBy !== socket.id) {
                toast.success(`Language changed to ${data.language}`)
            }
        }

        const handleUsersUpdate = (updatedUsers) => {
            setUsers(updatedUsers)
        }

        const handleUserJoined = (data) => {
            if (data.user.username !== username) {
                toast.success(`${data.user.username} joined the room`)
            }
        }

        const handleCodeRunning = () => {
            setIsRunning(true)
            setOutput('Running code...')
        }

        const handleCodeOutput = (data) => {
            setOutput(data.output)
            setIsRunning(false)
        }

        const handleJoinError = (data) => {
            console.error('❌ Join error:', data)
            toast.error(data.message || 'Failed to join room')
        }

        // Register event listeners
        socket.on('room-state', handleRoomState)
        socket.on('code-update', handleCodeUpdate)
        socket.on('language-update', handleLanguageUpdate)
        socket.on('users-update', handleUsersUpdate)
        socket.on('user-joined', handleUserJoined)
        socket.on('code-running', handleCodeRunning)
        socket.on('code-output', handleCodeOutput)
        socket.on('join-error', handleJoinError)

        // Auto-create room after a short delay if no response
        const timeout = setTimeout(() => {
            if (!isConnectedToRoom) {
                console.log('No room response, trying to join again...')
                socket.emit('join-room', {
                    roomId,
                    user: { username, id: Date.now().toString() }
                })
            }
        }, 2000)

        return () => {
            clearTimeout(timeout)
            // Cleanup event listeners
            socket.off('room-state', handleRoomState)
            socket.off('code-update', handleCodeUpdate)
            socket.off('language-update', handleLanguageUpdate)
            socket.off('users-update', handleUsersUpdate)
            socket.off('user-joined', handleUserJoined)
            socket.off('code-running', handleCodeRunning)
            socket.off('code-output', handleCodeOutput)
            socket.off('join-error', handleJoinError)
        }
    }, [socket, isConnected, roomId, username])

    const handleEditorChange = (value) => {
        setCode(value)
        if (socket && isConnectedToRoom) {
            socket.emit('code-change', {
                roomId,
                code: value,
                change: { timestamp: Date.now() }
            })
        }
    }

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage)
        if (socket && isConnectedToRoom) {
            socket.emit('language-change', {
                roomId,
                language: newLanguage
            })
        }
    }

    const runCode = () => {
        if (socket && isConnectedToRoom) {
            socket.emit('run-code', {
                roomId,
                code,
                language
            })
            setIsRunning(true)
            setOutput('Running code...')
        }
    }

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId)
        toast.success('Room ID copied to clipboard!')
    }

    const shareRoom = () => {
        const url = window.location.href
        navigator.clipboard.writeText(url)
        toast.success('Room link copied to clipboard!')
    }

    const leaveRoom = () => {
        if (socket) {
            socket.emit('leave-room', { roomId })
        }
        navigate('/')
    }

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor
    }

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <Cpu className="w-16 h-16 text-primary-500 mx-auto mb-4 animate-spin" />
                    <h2 className="text-2xl font-bold text-white mb-2">Connecting to Server...</h2>
                    <p className="text-gray-400">Please wait while we connect to the backend</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">
            <header className="glass border-b border-white/10">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gradient-to-r from-primary-500 to-blue-500 rounded-lg">
                                    <Code2 className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-white">CodeCollab</h1>
                                    <div className="flex items-center space-x-2 text-sm">
                                        <div className={`w-2 h-2 rounded-full ${isConnectedToRoom ? 'bg-green-500 animate-pulse' : 'bg-yellow-500 animate-pulse'}`}></div>
                                        <span className="text-gray-400">
                                            Room: <span className="font-mono text-white">{roomId}</span>
                                            {!isConnectedToRoom && ' (Setting up room...)'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button onClick={copyRoomId} className="flex items-center space-x-2 px-3 py-2 text-sm bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                                    <Copy className="w-4 h-4" />
                                    <span>Copy ID</span>
                                </button>
                                <button onClick={shareRoom} className="flex items-center space-x-2 px-3 py-2 text-sm bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                                    <Share2 className="w-4 h-4" />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <LanguageSelector value={language} onChange={handleLanguageChange} />
                            <button onClick={runCode} disabled={isRunning || !isConnectedToRoom} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium rounded-lg transition-all duration-200 disabled:cursor-not-allowed">
                                <Play className="w-4 h-4" />
                                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                            </button>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                                <Monitor className="w-4 h-4" />
                                <span>{users.length} Online</span>
                            </div>
                            <button onClick={leaveRoom} className="flex items-center space-x-2 px-4 py-2 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors">
                                <LogOut className="w-4 h-4" />
                                <span>Leave</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex">
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 p-6">
                        <div className="glass rounded-xl overflow-hidden h-full">
                            <Editor
                                height="100%"
                                language={language}
                                value={code}
                                onChange={handleEditorChange}
                                theme="vs-dark"
                                options={{
                                    minimap: { enabled: true },
                                    fontSize: 14,
                                    automaticLayout: true,
                                }}
                                loading={
                                    <div className="flex items-center justify-center h-full">
                                        <Cpu className="w-8 h-8 text-primary-500 animate-spin" />
                                    </div>
                                }
                            />
                        </div>
                    </div>
                    <div className="px-6 pb-6">
                        <OutputPanel output={output} isRunning={isRunning} />
                    </div>
                </div>
                <div className="w-80 glass border-l border-white/10">
                    <div className="p-6">
                        <UserList users={users} currentUsername={username} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodeEditor