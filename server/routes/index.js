// server/routes/index.js
const express = require('express');
const router = express.Router();

//  Import route files
const authRoutes = require('./authRoutes');
const transactionRoutes = require('./transactionRoutes');

// Use routes

router.use('/auth', authRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;