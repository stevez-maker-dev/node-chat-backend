import dotenv from 'dotenv';

dotenv.config();

const enviroment = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
};

export default enviroment;