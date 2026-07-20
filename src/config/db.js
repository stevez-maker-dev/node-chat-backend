import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conexion a la Base de datos exitosa');
    } catch (error) {
        console.error('Fallo la conexion a la base de datos:', error);
        process.exit(1);
    }
}

export default connectDB;