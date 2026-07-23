import { Router } from 'express';
import { sendMessage, getMessagesByChat } from '../controllers/messageController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = Router();

router.use(authMiddleware);

router.post('/', sendMessage);
router.get('/:chatId', getMessagesByChat);

export default router;