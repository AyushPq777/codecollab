import React from 'react'
import { Users, User, Wifi } from 'lucide-react'

const UserList = ({ users, currentUsername }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
                <Users className="w-5 h-5 text-primary-400" />
                <h3 className="text-lg font-semibold text-white">Online Users</h3>
                <span className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs font-medium rounded-full">
                    {users.length}
                </span>
            </div>

            <div className="space-y-3">
                {users.map((user, index) => (
                    <div
                        key={user.socketId || index}
                        className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                    >
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {user.username?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full"></div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">
                                {user.username}
                                {user.username === currentUsername && (
                                    <span className="ml-2 text-xs text-primary-400">(You)</span>
                                )}
                            </p>
                            <div className="flex items-center space-x-1 text-xs text-gray-400">
                                <Wifi className="w-3 h-3" />
                                <span>Online</span>
                            </div>
                        </div>
                    </div>
                ))}

                {users.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                        <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No users online</p>
                    </div>
                )}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-white">{users.length}</div>
                        <div className="text-xs text-gray-400">Online</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-primary-400">
                            {users.filter(u => u.username === currentUsername).length}
                        </div>
                        <div className="text-xs text-gray-400">You</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserList