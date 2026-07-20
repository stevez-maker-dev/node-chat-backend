import { Router } from 'express';
import { sendMessage, getMessagesByChat } from '../controllers/messageController.js';
const router = Router();

router.post('/', sendMessage);
router.get('/:chatId', getMessagesByChat);

export default router;