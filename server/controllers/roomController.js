import Room from '../models/Room.js';
import { v4 as uuidv4 } from 'uuid';

// @desc    Create a new room
// @route   POST /api/rooms
// @access  Private
export const createRoom = async (req, res) => {
    try {
        const { name, description, language, isPublic, password, maxUsers, settings } = req.body;

        const roomId = uuidv4().slice(0, 8); // Generate short room ID

        const room = await Room.create({
            roomId,
            name: name || 'Untitled Room',
            description: description || '',
            language: language || 'javascript',
            isPublic: isPublic !== undefined ? isPublic : true,
            password: password || null,
            maxUsers: maxUsers || 10,
            createdBy: req.user.id,
            settings: settings || {
                allowExecution: true,
                allowGuests: true,
                requireLogin: false
            }
        });

        // Populate createdBy field
        await room.populate('createdBy', 'username email');

        res.status(201).json({
            success: true,
            message: 'Room created successfully',
            data: { room }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error creating room',
            error: error.message
        });
    }
};

// @desc    Get room by ID
// @route   GET /api/rooms/:roomId
// @access  Public (with optional auth)
export const getRoom = async (req, res) => {
    try {
        const room = await Room.findOne({ roomId: req.params.roomId })
            .populate('createdBy', 'username email')
            .populate('users.user', 'username email isOnline');

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        // Check if room requires authentication
        if (room.settings.requireLogin && !req.user) {
            return res.status(401).json({
                success: false,
                message: 'This room requires login to access'
            });
        }

        res.json({
            success: true,
            data: { room }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error fetching room',
            error: error.message
        });
    }
};

// @desc    Update room
// @route   PUT /api/rooms/:roomId
// @access  Private (room owner only)
export const updateRoom = async (req, res) => {
    try {
        const room = await Room.findOne({ roomId: req.params.roomId });

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        // Check if user is the room creator
        if (room.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this room'
            });
        }

        const updates = req.body;
        const allowedUpdates = ['name', 'description', 'language', 'isPublic', 'password', 'maxUsers', 'settings'];

        allowedUpdates.forEach(update => {
            if (updates[update] !== undefined) {
                room[update] = updates[update];
            }
        });

        await room.save();
        await room.populate('createdBy', 'username email');

        res.json({
            success: true,
            message: 'Room updated successfully',
            data: { room }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error updating room',
            error: error.message
        });
    }
};

// @desc    Delete room
// @route   DELETE /api/rooms/:roomId
// @access  Private (room owner only)
export const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findOne({ roomId: req.params.roomId });

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        // Check if user is the room creator
        if (room.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this room'
            });
        }

        await Room.deleteOne({ roomId: req.params.roomId });

        res.json({
            success: true,
            message: 'Room deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error deleting room',
            error: error.message
        });
    }
};

// @desc    Get user's rooms
// @route   GET /api/rooms/user/my-rooms
// @access  Private
export const getUserRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ createdBy: req.user.id })
            .populate('users.user', 'username email')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: { rooms }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error fetching user rooms',
            error: error.message
        });
    }
};

// @desc    Get public rooms
// @route   GET /api/rooms/public
// @access  Public
export const getPublicRooms = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const rooms = await Room.find({ isPublic: true })
            .populate('createdBy', 'username email')
            .populate('users.user', 'username')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Room.countDocuments({ isPublic: true });

        res.json({
            success: true,
            data: {
                rooms,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error fetching public rooms',
            error: error.message
        });
    }
};