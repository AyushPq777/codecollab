import React, { createContext, useState, useContext, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const AuthContext = createContext()

// Custom hook must be defined outside the provider
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

// Create the provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Create axios instance with base URL
    const api = axios.create({
        baseURL: 'http://localhost:5000/api',
    })

    useEffect(() => {
        checkAuthStatus()
    }, [])

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                // Set authorization header for this specific request
                const response = await api.get('/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setUser(response.data.data.user)
                // Set default header for future requests
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            }
        } catch (error) {
            console.log('No valid token or auth check failed (this is normal for new users)')
            localStorage.removeItem('token')
            delete api.defaults.headers.common['Authorization']
        } finally {
            setLoading(false)
        }
    }

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password })
            const { user, token } = response.data.data

            localStorage.setItem('token', token)
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setUser(user)

            toast.success('Login successful!')
            return { success: true }
        } catch (error) {
            console.error('Login error:', error)
            const message = error.response?.data?.message ||
                error.response?.data?.error ||
                'Login failed. Please check your credentials.'
            toast.error(message)
            return { success: false, message }
        }
    }

    const register = async (userData) => {
        try {
            const response = await api.post('/auth/register', userData)
            const { user, token } = response.data.data

            localStorage.setItem('token', token)
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setUser(user)

            toast.success('Registration successful!')
            return { success: true }
        } catch (error) {
            console.error('Registration error:', error)
            const message = error.response?.data?.message ||
                error.response?.data?.error ||
                error.response?.data?.errors?.[0]?.msg ||
                'Registration failed. Please try again.'
            toast.error(message)
            return { success: false, message }
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        delete api.defaults.headers.common['Authorization']
        setUser(null)
        toast.success('Logged out successfully')
    }

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// Named export for the context itself (optional)
export { AuthContext }