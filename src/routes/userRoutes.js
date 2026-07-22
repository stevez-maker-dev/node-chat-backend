import { Router } from 'express';
import { getUsers, deleteUserById } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = Router();

router.use(authMiddleware);

router.get('/', getUsers);
router.delete('/:id', deleteUserById);

export default router;