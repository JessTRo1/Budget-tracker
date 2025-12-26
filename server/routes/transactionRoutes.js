import express from 'express';
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from '../controllers/transactionController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect all transaction routes
router.use(authMiddleware);

router.route('/').get(getTransactions).post(createTransaction);
router.route('/:id').put(updateTransaction).delete(deleteTransaction);

export default router;
