import jwt from 'jsonwebtoken';
import enviroment from '../config/enviroment.js';

export const authMiddleware = async (req, res, next) => {
    const auth_header = req.headers.authorization;
    const token = auth_header && auth_header.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, data: null, message: 'No autorizado' });
    }
    try {
        const payload = jwt.verify(token, enviroment.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({ success: false, data: null, message: 'Error en la verificación del token' });
    }

}