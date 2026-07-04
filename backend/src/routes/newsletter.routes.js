import { Router } from 'express';
import { subscribe } from '../controllers/newsletter.controller.js';
import { subscribeValidation, handleValidationErrors } from '../middleware/validation.js';

const router = Router();

router.post('/subscribe', subscribeValidation, handleValidationErrors, subscribe);

export default router;
