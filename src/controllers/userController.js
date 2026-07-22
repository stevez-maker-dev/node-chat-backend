import User from '../models/User.js';

// Get all users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users, message: 'Usuarios obtenidos exitosamente' });
    } catch (error) {
        res.status(400);
        next(error);
    }
}

// Delete a user by ID
export const deleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ success: false, data: null, message: 'Usuario no encontrado' });
        }
        res.status(200).json({ success: true, data: user, message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(400);
        next(error);
    }
}