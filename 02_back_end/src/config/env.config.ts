import dotenv from 'dotenv';
dotenv.config({
    path: '.env'
  });

/**
 * Configuratin for type Secret of jwt in Login.ts Services
 */
const env = process.env as {
    'JWT_SECRET': string;
  };

const envData = {
jwt_secret: env.JWT_SECRET,
};

export default envData;