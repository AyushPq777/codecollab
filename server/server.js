import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Import config and routes
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import { setupSocketHandlers } from './socket/socketHandlers.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://127.0.0.1:3000", "https://codecollab-mtyy42pot-aayush-goyals-projects.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
})

// Security middleware
app.use(helmet());
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000", "https://codecollab-mtyy42pot-aayush-goyals-projects.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'CodeCollab API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// Setup socket handlers
setupSocketHandlers(io);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`🔗 Client URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
    console.log(`🗄️  Database: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/codecollab'}`);
});

export { io };