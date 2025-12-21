const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId }, 
    transactionId: { type: String, required: true, unique: true }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    amount: {type: Number, required: true},
    category: { type: String, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    date: { type: Date, required: true },
    description: { type: String },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;

