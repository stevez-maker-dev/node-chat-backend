import Chat from '../models/Chat.js';
import User from '../models/User.js';

// Create a new chat
export const createChat = async (req, res, next) => {
    try {
        const { participants } = req.body;
        const usersFound = await User.find({ _id: { $in: participants } });
        if (usersFound.length !== participants.length) {
            return res.status(400).json({ success: false, data: null, message: 'Algunos usuarios no existen' });
        }
        const chat = await Chat.create({ participants });
        res.status(201).json({ success: true, data: chat, message: 'Chat creado exitosamente' });
    } catch (error) {
        res.status(400);
        next(error);
    }
}

// Get all chats
export const getChats = async (req, res, next) => {
    try {
        const chats = await Chat.find().populate('participants', 'username email');
        res.status(200).json({ success: true, data: chats, message: 'Chats obtenidos exitosamente' });
    } catch (error) {
        res.status(400);
        next(error);
    }
}