import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import noteRoutes from './routes/note.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/api/notes', noteRoutes);

// Globalny middleware do obsługi błędów
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Wystąpił błąd serwera', error: err.message });
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/obsydian-clone';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Połączono z MongoDB'))
  .catch(err => console.error('Błąd połączenia z MongoDB:', err));

export default app;