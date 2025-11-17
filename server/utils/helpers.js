import Room from '../models/Room.js';

export const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
};

export const validateRoomAccess = async (roomId, user = null) => {
    const room = await Room.findOne({ roomId });

    if (!room) {
        return { valid: false, error: 'Room not found' };
    }

    if (room.settings.requireLogin && !user) {
        return { valid: false, error: 'Login required to access this room' };
    }

    if (room.users.length >= room.maxUsers) {
        return { valid: false, error: 'Room is full' };
    }

    return { valid: true, room };
};

export const sanitizeRoomData = (room) => {
    const roomObj = room.toObject ? room.toObject() : room;

    // Remove sensitive data
    delete roomObj.password;

    return roomObj;
};

export const formatSocketUser = (user, socketId) => {
    return {
        id: user._id || user.id,
        username: user.username,
        email: user.email,
        socketId,
        joinedAt: new Date(),
        isActive: true
    };
};