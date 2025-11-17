import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

export const validateRoomCreation = [
    body('name')
        .optional()
        .isLength({ min: 1, max: 100 })
        .withMessage('Room name must be between 1 and 100 characters'),
    body('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),
    body('language')
        .optional()
        .isIn(['javascript', 'python', 'java', 'cpp', 'html', 'css', 'typescript'])
        .withMessage('Invalid language selected'),
    body('maxUsers')
        .optional()
        .isInt({ min: 1, max: 50 })
        .withMessage('Max users must be between 1 and 50'),
    handleValidationErrors
];

export const validateUserRegistration = [
    body('username')
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username can only contain letters, numbers and underscores'),
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    handleValidationErrors
];