import mongoose from 'mongoose';
import enviroment from './enviroment.js';

const connectDB = async () => {
    try {
        await mongoose.connect(enviroment.MONGODB_URI);
        console.log('Conexion a la Base de datos exitosa');
    } catch (error) {
        console.error('Fallo la conexion a la base de datos:', error);
        process.exit(1);
    }
}

export default connectDB;