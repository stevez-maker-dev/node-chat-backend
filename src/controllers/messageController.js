import Message from '../models/Message.js';
import Chat from '../models/Chat.js';
import User from '../models/User.js';

// Send a message in a chat
export const sendMessage = async (req, res, next) => {
    try {
        const { chatId, userId, content } = req.body;
        const chatExists = await Chat.findById(chatId);
        if (!chatExists) {
            return res.status(404).json({ success: false, data: null, message: 'Chat no encontrado' });
        }
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ success: false, data: null, message: 'Usuario no encontrado' });
        }
        const message = await Message.create({ chatId: chatId, userId: userId, content });
        res.status(201).json({ success: true, data: message, message: 'Mensaje enviado exitosamente' });
    } catch (error) {
        res.status(400);
        next(error);
    }
}

// Get all messages in a chat
export const getMessagesByChat = async (req, res, next) => {
    try {
        const { chatId } = req.params;
        const messages = await Message.find({ chatId }).populate('userId', 'username email').sort({ createdAt: 1 });
        res.status(200).json({ success: true, data: messages, message: 'Mensajes obtenidos exitosamente' });
    } catch (error) {
        res.status(400);
        next(error);
    }
}