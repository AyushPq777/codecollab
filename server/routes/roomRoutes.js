import express from 'express';
import {
    createRoom,
    getRoom,
    updateRoom,
    deleteRoom,
    getUserRooms,
    getPublicRooms
} from '../controllers/roomController.js';
import { protect, optionalAuth } from '../middleware/auth.js';
import { validateRoomCreation } from '../middleware/validation.js';

const router = express.Router();

router.post('/', protect, validateRoomCreation, createRoom);
router.get('/public', getPublicRooms);
router.get('/user/my-rooms', protect, getUserRooms);
router.get('/:roomId', optionalAuth, getRoom);
router.put('/:roomId', protect, updateRoom);
router.delete('/:roomId', protect, deleteRoom);

export default router;