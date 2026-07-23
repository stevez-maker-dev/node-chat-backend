import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import enviroment from './config/enviroment.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);

connectDB();

app.get('/', (req, res) => {
    res.json({ success: true, data: null, message: 'API funcionando' });
});

app.use(errorHandler);

const PORT = enviroment.PORT;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});