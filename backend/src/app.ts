import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

const app = express();

import indexRoutes from './routes/index.route';

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());

// Routes
app.use('/api',indexRoutes);

// Static Files (Images)
// NOTA: ES IMPORTANTE QUE LA RUTA SEA ABSOLUTA
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;