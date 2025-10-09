const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        allowNull: true,
    },
    topupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topup',
        allowNull: true,
    },
    type: {
        type: String,
        enum: ['topup', 'refund', 'deduction', 'payment'],
        allowNull: true,
    },
    amount: {
        type: Number,
        allowNull: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'cancelled'],
        allowNull: true,
        default: 'pending',
    },
    description: {
        type: String,
        allowNull: true,
    },
    referenceId: {
        type: String,
        allowNull: true,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        allowNull: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        allowNull: true,
    },
    paymentMethod: {
        type: String,
        allowNull: true,
        default: 'bank_transfer',
    },
    currency: {
        type: String,
        allowNull: true,
        default: 'SAR',
    },
    processedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        allowNull: true,
    },
    processedAt: {
        type: Date,
        allowNull: true,
    },
    notes: {
        type: String,
        allowNull: true,
    },
    previousBalance: {
        type: Number,
        allowNull: true,
    },
    newBalance: {
        type: Number,
        allowNull: true,
    },
    walletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
        allowNull: true,
    },
    walletPreviousBalance: {
        type: Number,
        allowNull: true,
    },
    walletNewBalance: {
        type: Number,
        allowNull: true,
    },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
