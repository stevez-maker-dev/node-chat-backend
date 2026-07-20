import { Router } from 'express';
import { createChat, getChats } from '../controllers/chatController.js';
const router = Router();

router.post('/', createChat);
router.get('/', getChats);

export default router;