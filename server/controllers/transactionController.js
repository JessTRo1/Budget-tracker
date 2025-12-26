// Handle transaction operations
import Transaction from '../models/Transactions.js';
import { randomUUID } from 'node:crypto';

async function createTransaction(req, res, next) {
    try {
        const { name, amount, category, type, date, description } = req.body;
        const userId = req.user.userId;
        if (!name || !amount || !category || !type || !date) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const transactionId = randomUUID();
        const newTransaction = new Transaction({
            userId,
            name,
            amount: Number(amount),
            category,
            type,
            date: new Date(date),
            description,
            transactionId
        });
        await newTransaction.save();
        res.status(201).json({ message: 'Transaction created successfully', transaction: newTransaction });
    } catch (error) {
      next(error);
    }
}

async function getTransactions(req, res, next) {
    try {
        const userId = req.user.userId;
        const transactions = await Transaction.find({ userId }).sort({ date: -1 });
        res.status(200).json({ transactions });
    } catch (error) { 
        next(error);
    }
}

async function updateTransaction(req, res, next) {
    const transactionId = req.params.id;
    const userId = req.user.userId;
    try {
        const transaction = await Transaction.findOne({ _id: transactionId, userId });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        const { name, amount, category, type, date, description } = req.body;
        if (name !== undefined) transaction.name = name;
        if (amount !== undefined) transaction.amount = Number(amount);
        if (category !== undefined) transaction.category = category;
        if (type !== undefined) transaction.type = type;
        if (date !== undefined) transaction.date = new Date(date);
        if (description !== undefined) transaction.description = description;
        await transaction.save();
        res.status(200).json({ message: 'Transaction updated successfully', transaction });
    } catch (error) {
        next(error);
    }
}

async function deleteTransaction(req, res, next) {
    const transactionId = req.params.id;
    const userId = req.user.userId;
    try {
        const transaction = await Transaction.findOneAndDelete({ _id: transactionId, userId });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        next(error);
    }
}

export { createTransaction, getTransactions, updateTransaction, deleteTransaction };