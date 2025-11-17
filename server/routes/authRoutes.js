import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validateUserRegistration } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validateUserRegistration, register);
router.post('/login', login);
router.get('/me', protect, getMe);

export default router;