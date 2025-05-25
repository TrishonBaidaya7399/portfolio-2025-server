import { NextFunction, Response, Router, Request } from 'express';
import { body, validationResult } from 'express-validator';
import { createContact } from '../controllers/contactController';

const router = Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').notEmpty().withMessage('Message is required'),
    body('phone').optional().isString(),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }
    next();
  },
  createContact
);

export default router;