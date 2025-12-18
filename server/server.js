const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');
const corsOptions = require('./config/corsOptions');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

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