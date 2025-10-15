const Topup = require('../models/topupModel');
const Wallet = require('../models/walletModel');
const Seller = require('../models/sellerModel');
const Admin = require('../models/adminModel');
const Transaction = require('../models/transactionModel');
const { mainUrl } = require('../config/dbConfig');

// 1. Create topup
const addtopup = async (req, res) => {
    try {
        const info = {
            transactionProof: req.files.transactionProof === undefined ? '' : mainUrl + req.files.transactionProof[0].filename,
            sellerId: req.body.sellerId,
            amount: req.body.amount,
            status: req.body.status || 'pending',
            transactionId: req.body.transactionId,
            adminNotes: req.body.adminNotes,
        };

        const topup = await Topup.create(info);

        // Create pending transaction record
        await Transaction.create({
            sellerId: topup.sellerId,
            topupId: topup._id,
            type: 'topup',
            amount: topup.amount,
            status: 'pending',
            description: `Topup request created - Amount: ${topup.amount} SAR`,
            referenceId: topup.transactionId || `TOPUP_${topup._id}`,
            paymentMethod: 'bank_transfer',
            currency: 'SAR',
            processedBy: null, // Will be set when approved
            processedAt: null, // Will be set when approved
            notes: 'Topup request submitted, awaiting approval',
            previousBalance: null, // Will be set when approved
            newBalance: null // Will be set when approved
        });

        return res.status(200).json({ status: 'ok', data: topup });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all topups
const gettopups = async (req, res) => {
    try {
        const topups = await Topup.find({}).populate(['sellerId']);
        return res.status(200).json({ status: 'ok', data: topups });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Get topup by id
const gettopupById = async (req, res) => {
    try {
        const id = req.params.id;
        const topup = await Topup.findById(id).populate(['sellerId']);
        return res.status(200).json({ status: 'ok', data: topup });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Get topups by seller id
const gettopupsBySellerId = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const topups = await Topup.find({ sellerId }).populate(['sellerId']);
        return res.status(200).json({ status: 'ok', data: topups });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Update topup
const updatetopup = async (req, res) => {
    try {
        const id = req.params.id;
        let getImage = await Topup.findById(id);
        const transactionProof = req.files.transactionProof === undefined ? getImage.transactionProof : mainUrl + req.files.transactionProof[0].filename;

        const updatedtopup = await Topup.findByIdAndUpdate(id,
            { ...req.body, transactionProof: transactionProof },
            { new: true }).populate(['sellerId']);
        return res.status(200).json({ status: 'ok', data: updatedtopup });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 6. Delete topup
const deletetopup = async (req, res) => {
    try {
        const id = req.params.id;
        await Topup.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'topup deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 7. Approve topup
const approveTopup = async (req, res) => {
    try {
        const id = req.params.id;
        const { adminNotes } = req.body;

        const topup = await Topup.findById(id);
        if (!topup) {
            return res.status(200).json({ status: 'fail', message: 'Topup not found' });
        }

        if (topup.status !== 'pending') {
            return res.status(200).json({ status: 'fail', message: 'Topup has already been processed' });
        }

        // Update topup status
        const updatedtopup = await Topup.findByIdAndUpdate(id,
            {
                status: 'approved',
                processedAt: new Date(),
                adminNotes: adminNotes || ''
            },
            { new: true }).populate(['sellerId']);

        // Add funds to seller's wallet (both Wallet model and Seller model)
        let wallet = await Wallet.findOne({ sellerId: topup.sellerId });
        if (!wallet) {
            wallet = await Wallet.create({ sellerId: topup.sellerId });
        }
        
        const previousBalance = wallet.balance;
        wallet.balance += topup.amount;
        wallet.totalTopup += topup.amount;
        wallet.lastTransactionAt = new Date();
        await wallet.save();

        // Update seller's wallet balance
        const seller = await Seller.findById(topup.sellerId);
        if (seller) {
            seller.wallet = (seller.wallet || 0) + topup.amount;
            await seller.save();
        }

        // Update admin's total topup approved statistics
        const admin = await Admin.findOne();
        if (admin) {
            admin.totalTopupApproved += topup.amount;
            await admin.save();
        }

        // Update existing pending transaction to completed
        const existingTransaction = await Transaction.findOne({
            topupId: topup._id,
            status: 'pending'
        });

        if (existingTransaction) {
            existingTransaction.status = 'completed';
            existingTransaction.description = `Topup approved - Amount: ${topup.amount} SAR`;
            existingTransaction.processedBy = admin ? admin._id : null;
            existingTransaction.processedAt = new Date();
            existingTransaction.notes = adminNotes || 'Topup approved by admin';
            existingTransaction.previousBalance = previousBalance;
            existingTransaction.newBalance = wallet.balance;
            await existingTransaction.save();
        } else {
            // Fallback: create transaction record if not found (for backward compatibility)
            await Transaction.create({
                sellerId: topup.sellerId,
                topupId: topup._id,
                type: 'topup',
                amount: topup.amount,
                status: 'completed',
                description: `Topup approved - Amount: ${topup.amount} SAR`,
                referenceId: topup.transactionId || `TOPUP_${topup._id}`,
                paymentMethod: 'bank_transfer',
                currency: 'SAR',
                processedBy: admin ? admin._id : null,
                processedAt: new Date(),
                notes: adminNotes || 'Topup approved by admin',
                previousBalance: previousBalance,
                newBalance: wallet.balance
            });
        }

        return res.status(200).json({
            status: 'ok',
            message: 'Topup approved successfully',
            data: updatedtopup
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 8. Reject topup
const rejectTopup = async (req, res) => {
    try {
        const id = req.params.id;
        const { adminNotes } = req.body;

        const topup = await Topup.findById(id);
        if (!topup) {
            return res.status(200).json({ status: 'fail', message: 'Topup not found' });
        }

        if (topup.status !== 'pending') {
            return res.status(200).json({ status: 'fail', message: 'Topup has already been processed' });
        }

        const updatedtopup = await Topup.findByIdAndUpdate(id,
            {
                status: 'rejected',
                processedAt: new Date(),
                adminNotes: adminNotes || ''
            },
            { new: true }).populate(['sellerId']);

        // Update existing pending transaction to failed
        const existingTransaction = await Transaction.findOne({
            topupId: topup._id,
            status: 'pending'
        });

        if (existingTransaction) {
            existingTransaction.status = 'failed';
            existingTransaction.description = `Topup rejected - Amount: ${topup.amount} SAR`;
            existingTransaction.processedAt = new Date();
            existingTransaction.notes = adminNotes || 'Topup rejected by admin';
            await existingTransaction.save();
        }

        return res.status(200).json({
            status: 'ok',
            message: 'Topup rejected successfully',
            data: updatedtopup
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 9. Refund topup
const refundTopup = async (req, res) => {
    try {
        const id = req.params.id;
        const { adminNotes, refundAmount, reason } = req.body;

        const topup = await Topup.findById(id);
        if (!topup) {
            return res.status(200).json({ status: 'fail', message: 'Topup not found' });
        }

        if (topup.status !== 'approved') {
            return res.status(200).json({ status: 'fail', message: 'Only approved topups can be refunded' });
        }

        // Determine refund amount
        const refundAmt = refundAmount ? parseFloat(refundAmount) : topup.amount;
        if (refundAmt <= 0 || refundAmt > topup.amount) {
            return res.status(200).json({ status: 'fail', message: 'Invalid refund amount' });
        }

        // Check if seller has sufficient balance
        const wallet = await Wallet.findOne({ sellerId: topup.sellerId });
        if (!wallet || wallet.balance < refundAmt) {
            return res.status(200).json({ status: 'fail', message: 'Insufficient wallet balance for refund' });
        }

        // Update topup status to refunded
        const updatedtopup = await Topup.findByIdAndUpdate(id,
            {
                status: 'refunded',
                processedAt: new Date(),
                adminNotes: adminNotes || ''
            },
            { new: true }).populate(['sellerId']);

        // Deduct funds from seller's wallet
        const previousBalance = wallet.balance;
        wallet.balance -= refundAmt;
        wallet.totalSpent += refundAmt;
        wallet.lastTransactionAt = new Date();
        await wallet.save();

        // Update seller's wallet balance
        const seller = await Seller.findById(topup.sellerId);
        if (seller) {
            seller.wallet = Math.max(0, (seller.wallet || 0) - refundAmt);
            await seller.save();
        }

        // Update admin's total refunded statistics
        const admin = await Admin.findOne();
        if (admin) {
            admin.totalRefunded = (admin.totalRefunded || 0) + refundAmt;
            await admin.save();
        }

        // Create refund transaction record
        await Transaction.create({
            sellerId: topup.sellerId,
            topupId: topup._id,
            type: 'refund',
            amount: refundAmt,
            status: 'completed',
            description: `Refund processed - Amount: ${refundAmt} SAR`,
            referenceId: `REFUND_${topup._id}_${Date.now()}`,
            paymentMethod: 'bank_transfer',
            currency: 'SAR',
            processedBy: admin ? admin._id : null,
            processedAt: new Date(),
            notes: reason || adminNotes || 'Topup refunded by admin',
            previousBalance: previousBalance,
            newBalance: wallet.balance
        });

        return res.status(200).json({
            status: 'ok',
            message: 'Refund processed successfully',
            data: {
                topup: updatedtopup,
                refundAmount: refundAmt,
                newWalletBalance: wallet.balance
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 10. Get transactions by seller ID
const getTransactionsBySellerId = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const transactions = await Transaction.find({ sellerId })
            .populate([
                'sellerId', 
                'topupId', 
                'processedBy', 
                {
                    path: 'bookId',
                    populate: [
                        { path: 'userId' },
                        { path: 'subCategoryId' }
                    ]
                }
            ])
            .sort({ createdAt: -1 });
        return res.status(200).json({ status: 'ok', data: transactions });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 11. Get all transactions
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({})
            .populate(['sellerId', 'topupId', 'processedBy'])
            .sort({ createdAt: -1 });
        return res.status(200).json({ status: 'ok', data: transactions });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 12. Get dashboard statistics
const getDashboardStats = async (req, res) => {
    try {
        // Get total balance across all wallets
        const totalBalanceResult = await Wallet.aggregate([
            {
                $group: {
                    _id: null,
                    totalBalance: { $sum: '$balance' }
                }
            }
        ]);
        const totalBalance = totalBalanceResult.length > 0 ? totalBalanceResult[0].totalBalance : 0;

        // Get total spent across all wallets
        const totalSpentResult = await Wallet.aggregate([
            {
                $group: {
                    _id: null,
                    totalSpent: { $sum: '$totalSpent' }
                }
            }
        ]);
        const totalSpent = totalSpentResult.length > 0 ? totalSpentResult[0].totalSpent : 0;

        // Get total topup across all wallets
        const totalTopupResult = await Wallet.aggregate([
            {
                $group: {
                    _id: null,
                    totalTopup: { $sum: '$totalTopup' }
                }
            }
        ]);
        const totalTopup = totalTopupResult.length > 0 ? totalTopupResult[0].totalTopup : 0;

        const dashboardData = {
            totalBalance: totalBalance,
            totalSpent: totalSpent,
            totalTopup: totalTopup,
            currency: 'SAR'
        };

        return res.status(200).json({ 
            status: 'ok', 
            data: dashboardData 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 13. Get seller dashboard statistics
const getSellerDashboardStats = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;

        // Get seller's wallet
        const wallet = await Wallet.findOne({ sellerId });
        if (!wallet) {
            return res.status(200).json({ 
                status: 'ok', 
                data: {
                    totalBalance: 0,
                    totalSpent: 0,
                    totalTopup: 0,
                    currency: 'SAR'
                }
            });
        }

        const dashboardData = {
            totalBalance: wallet.balance || 0,
            totalSpent: wallet.totalSpent || 0,
            totalTopup: wallet.totalTopup || 0,
            currency: 'SAR'
        };

        return res.status(200).json({ 
            status: 'ok', 
            data: dashboardData 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addtopup,
    gettopups,
    gettopupById,
    updatetopup,
    deletetopup,
    gettopupsBySellerId,
    approveTopup,
    rejectTopup,
    refundTopup,
    getTransactionsBySellerId,
    getAllTransactions,
    getDashboardStats,
    getSellerDashboardStats
};
