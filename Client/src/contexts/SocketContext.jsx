import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { toast } from 'react-hot-toast'

const SocketContext = createContext()

export const useSocket = () => {
    const context = useContext(SocketContext)
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider')
    }
    return context
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        // Connect to backend - UPDATED FOR PRODUCTION
        const newSocket = io('https://your-app.up.railway.app', {
            transports: ['websocket', 'polling']
        })

        newSocket.on('connect', () => {
            setIsConnected(true)
            console.log('✅ Connected to server')
        })

        newSocket.on('disconnect', () => {
            setIsConnected(false)
            console.log('❌ Disconnected from server')
        })

        newSocket.on('connect_error', (error) => {
            console.error('Connection error:', error)
            toast.error('Failed to connect to server. Make sure backend is running.')
        })

        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }
    }, [])

    const value = {
        socket,
        isConnected
    }

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}