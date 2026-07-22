import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Create a new user
export const registerUser = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: passwordHash, email });
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(201).json({ success: true, data: userWithoutPassword, message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(400);
        next(error);
    }
}

// Login a user
export const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ success: false, data: null, message: 'Credenciales inválidas' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, data: null, message: 'Credenciales inválidas' });
        }
        const { password: _, ...userWithoutPassword } = user.toObject();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ success: true, data: { user: userWithoutPassword, token: token }, message: 'Usuario autenticado exitosamente' });
    } catch (error) {
        res.status(400);
        next(error);
    }
}