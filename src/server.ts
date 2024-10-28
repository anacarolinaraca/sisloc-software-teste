import App from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.APP_PORT || 3000;

const app = new App();
app.start(Number(PORT));