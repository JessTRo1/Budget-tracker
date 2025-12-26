import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import routes from './routes/index.js';
import corsOptions from './config/corsOptions.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
await connectDB();

// ========== MIDDLEWARE ==========
app.use(helmet());                     // Security headers
app.use(morgan('dev'));                // Logging
app.use(cors(corsOptions));            // CORS with options
app.use(express.json());               // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data

// ========== ROUTES ==========
app.use('/api', routes);

// ========== ERROR HANDLER ==========
app.use(errorHandler);                 // Must be after routes

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Budget Tracker API running on port ${PORT}`);
})