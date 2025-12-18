const express = require('express');
const router = express.Router();
const {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect all transaction routes
router.use(authMiddleware);

router.route('/')
.get(getTransactions)
.post(createTransaction);

router.route('/:id')
.put(updateTransaction)
.delete(deleteTransaction);

module.exports = router;
