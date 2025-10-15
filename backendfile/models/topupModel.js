const mongoose = require('mongoose');

const topupSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        allowNull: true,
    },
    amount: {
        type: Number,
        allowNull: true,
    },
    status: {
        type: String,
        allowNull: true,
        default: 'pending',
    },
    transactionProof: {
        type: String,
        allowNull: true,
    },
    transactionId: {
        type: String,
        allowNull: true,
    },
    adminNotes: {
        type: String,
        allowNull: true,
    },
    processedAt: {
        type: Date,
        allowNull: true,
    },
},{timestamps:true});

const Topup = mongoose.model('Topup', topupSchema);

module.exports = Topup;
