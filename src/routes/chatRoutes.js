import { Router } from 'express';
import { createChat, getChats } from '../controllers/chatController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = Router();

router.use(authMiddleware);

router.post('/', createChat);
router.get('/', getChats);

export default router;