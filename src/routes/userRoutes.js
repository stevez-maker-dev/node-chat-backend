import { Router } from 'express';
import { createUser, getUsers, deleteUserById } from '../controllers/userController.js';
const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.delete('/:id', deleteUserById);

export default router;