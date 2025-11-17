import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        default: 'Untitled Room',
        maxlength: 100
    },
    description: {
        type: String,
        maxlength: 500,
        default: ''
    },
    code: {
        type: String,
        default: '// Start coding...\nconsole.log("Hello, CodeCollab!");'
    },
    language: {
        type: String,
        default: 'javascript'
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    users: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        socketId: String,
        joinedAt: {
            type: Date,
            default: Date.now
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }],
    maxUsers: {
        type: Number,
        default: 10,
        min: 1,
        max: 50
    },
    settings: {
        allowExecution: {
            type: Boolean,
            default: true
        },
        allowGuests: {
            type: Boolean,
            default: true
        },
        requireLogin: {
            type: Boolean,
            default: false
        }
    }
}, {
    timestamps: true
});

// Index for better query performance
roomSchema.index({ roomId: 1 });
roomSchema.index({ createdBy: 1 });
roomSchema.index({ 'users.user': 1 });

export default mongoose.model('Room', roomSchema);