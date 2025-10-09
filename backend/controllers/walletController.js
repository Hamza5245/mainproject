const Wallet = require('../models/walletModel');
const Topup = require('../models/topupModel');
const Seller = require('../models/sellerModel');
const Admin = require('../models/adminModel');
const Transaction = require('../models/transactionModel');

// Utility function to get the first (and only) admin
const getFirstAdmin = async () => {
    try {
        const admin = await Admin.findOne();
        if (!admin) {
            throw new Error('No admin found in database');
        }
        return admin;
    } catch (error) {
        throw new Error(`Error getting admin: ${error.message}`);
    }
};

// 1. Create wallet
const addwallet = async (req, res) => {
    try {
        const info = {
            sellerId: req.body.sellerId,
            balance: req.body.balance || 0,
            totalTopup: req.body.totalTopup || 0,
            totalSpent: req.body.totalSpent || 0,
            currency: req.body.currency || 'SAR',
            isActive: req.body.isActive !== undefined ? req.body.isActive : true,
        };

        const wallet = await Wallet.create(info);
        return res.status(200).json({ status: 'ok', data: wallet });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all wallets
const getwallets = async (req, res) => {
    try {
        const wallets = await Wallet.find({}).populate('sellerId');
        return res.status(200).json({ status: 'ok', data: wallets });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Get wallet by id
const getwalletById = async (req, res) => {
    try {
        const id = req.params.id;
        const wallet = await Wallet.findById(id).populate('sellerId');
        return res.status(200).json({ status: 'ok', data: wallet });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Get wallet by seller id
const getwalletBySellerId = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        let wallet = await Wallet.findOne({ sellerId }).populate('sellerId');
       
        return res.status(200).json({ status: 'ok', data: wallet });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Update wallet
const updatewallet = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedwallet = await Wallet.findByIdAndUpdate(id, 
            { ...req.body }, 
            { new: true }).populate('sellerId');
        return res.status(200).json({ status: 'ok', data: updatedwallet });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 6. Delete wallet
const deletewallet = async (req, res) => {
    try {
        const id = req.params.id;
        await Wallet.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'wallet deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 7. Add funds to wallet
const addFunds = async (req, res) => {
    try {
      const { sellerId } = req.params;
        const { amount } = req.body;

        let wallet = await Wallet.findOne({ sellerId });
        if (!wallet) {
            wallet = await Wallet.create({ sellerId });
        }

        const addAmount = parseFloat(amount) || 0;
        wallet.balance += addAmount;
        wallet.totalTopup += addAmount;
        wallet.lastTransactionAt = new Date();
        await wallet.save();

        return res.status(200).json({ 
        status: 'ok',
        message: 'Funds added successfully',
            data: wallet 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 8. Deduct funds from wallet
const deductFunds = async (req, res) => {
    try {
      const { sellerId } = req.params;
        const { amount } = req.body;

      const wallet = await Wallet.findOne({ sellerId });
      if (!wallet) {
            return res.status(200).json({ status: 'fail', message: 'Wallet not found' });
        }

        const deductAmount = parseFloat(amount) || 0;
        if (wallet.balance < deductAmount) {
            return res.status(200).json({ status: 'fail', message: 'Insufficient balance' });
        }

        wallet.balance -= deductAmount;
        wallet.totalSpent += deductAmount;
        wallet.lastTransactionAt = new Date();
        await wallet.save();

        return res.status(200).json({ 
        status: 'ok',
        message: 'Funds deducted successfully',
            data: wallet 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 9. Get seller wallet balance
const getSellerWallet = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const seller = await Seller.findById(sellerId);
        
        if (!seller) {
            return res.status(200).json({ status: 'fail', message: 'Seller not found' });
        }

        return res.status(200).json({ 
            status: 'ok', 
            data: {
                sellerId: seller._id,
                sellerName: `${seller.firstName} ${seller.lastName}`,
                walletBalance: seller.wallet || 0,
                currency: 'SAR'
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 10. Get admin wallet balance and statistics
const getAdminWallet = async (req, res) => {
    try {
        const admin = await getFirstAdmin();

        // Get total approved topups
        const totalApprovedTopups = await Topup.aggregate([
            { $match: { status: 'approved' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        // Get total deducted from sellers
        const totalDeducted = await Seller.aggregate([
            { $group: { _id: null, total: { $sum: '$wallet' } } }
        ]);

        return res.status(200).json({ 
        status: 'ok',
        data: {
                adminId: admin._id,
                adminEmail: admin.email,
                walletBalance: admin.wallet || 0,
                totalDeducted: admin.totalDeducted || 0,
                totalTopupApproved: admin.totalTopupApproved || 0,
                totalApprovedTopups: totalApprovedTopups[0]?.total || 0,
                totalSellersWallet: totalDeducted[0]?.total || 0,
                currency: 'SAR'
            }
        });
    } catch (err) {
        if (err.message.includes('No admin found')) {
            return res.status(404).json({ status: 'fail', message: 'Admin not found' });
        }
        res.status(500).json({ error: err.message });
    }
};

// 11. Deduct from seller wallet and add to admin wallet
const deductFromSellerAddToAdmin = async (req, res) => {
    try {
        const { sellerId, amount, reason } = req.body;

        const seller = await Seller.findById(sellerId);
        const admin = await getFirstAdmin();

        if (!seller) {
            return res.status(200).json({ status: 'fail', message: 'Seller not found' });
        }

        const deductAmount = parseFloat(amount) || 0;
        if (deductAmount <= 0) {
            return res.status(200).json({ status: 'fail', message: 'Invalid amount' });
        }

        if (seller.wallet < deductAmount) {
            return res.status(200).json({ status: 'fail', message: 'Insufficient seller wallet balance' });
        }

        // Deduct from seller wallet
        seller.wallet -= deductAmount;
        await seller.save();

        // Add to admin wallet
        admin.wallet += deductAmount;
        admin.totalDeducted += deductAmount;
        await admin.save();

        return res.status(200).json({ 
            status: 'ok', 
            message: 'Amount transferred successfully',
            data: {
                sellerId: seller._id,
                sellerWallet: seller.wallet,
                adminId: admin._id,
                adminWallet: admin.wallet,
                transferredAmount: deductAmount,
                reason: reason || 'Wallet deduction'
            }
        });
    } catch (err) {
        if (err.message.includes('No admin found')) {
            return res.status(404).json({ status: 'fail', message: 'Admin not found' });
        }
        res.status(500).json({ error: err.message });
    }
};

// 12. Get all sellers with wallet balances
const getAllSellersWallet = async (req, res) => {
    try {
        const sellers = await Seller.find({}, 'firstName lastName email phone wallet verify block').sort({ wallet: -1 });
        
        const totalSellersWallet = sellers.reduce((sum, seller) => sum + (seller.wallet || 0), 0);
        
        return res.status(200).json({ 
        status: 'ok',
        data: {
                sellers: sellers,
                totalSellersWallet: totalSellersWallet,
                totalSellers: sellers.length,
                currency: 'SAR'
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 13. Get wallet statistics for admin dashboard
const getWalletStatistics = async (req, res) => {
    try {
        // Get total approved topups
        const totalApprovedTopups = await Topup.aggregate([
            { $match: { status: 'approved' } },
            { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
        ]);

        // Get pending topups
        const pendingTopups = await Topup.aggregate([
            { $match: { status: 'pending' } },
            { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
        ]);

        // Get rejected topups
        const rejectedTopups = await Topup.aggregate([
            { $match: { status: 'rejected' } },
            { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
        ]);

        // Get total sellers wallet
        const totalSellersWallet = await Seller.aggregate([
            { $group: { _id: null, total: { $sum: '$wallet' }, count: { $sum: 1 } } }
        ]);

        // Get admin wallet
        const adminWallet = await Admin.aggregate([
            { $group: { _id: null, total: { $sum: '$wallet' }, totalDeducted: { $sum: '$totalDeducted' }, totalTopupApproved: { $sum: '$totalTopupApproved' } } }
        ]);

        return res.status(200).json({ 
        status: 'ok',
            data: {
                topupStats: {
                    approved: {
                        total: totalApprovedTopups[0]?.total || 0,
                        count: totalApprovedTopups[0]?.count || 0
                    },
                    pending: {
                        total: pendingTopups[0]?.total || 0,
                        count: pendingTopups[0]?.count || 0
                    },
                    rejected: {
                        total: rejectedTopups[0]?.total || 0,
                        count: rejectedTopups[0]?.count || 0
                    }
                },
                walletStats: {
                    totalSellersWallet: totalSellersWallet[0]?.total || 0,
                    totalSellers: totalSellersWallet[0]?.count || 0,
                    adminWallet: adminWallet[0]?.total || 0,
                    totalDeducted: adminWallet[0]?.totalDeducted || 0,
                    totalTopupApproved: adminWallet[0]?.totalTopupApproved || 0
                },
                currency: 'SAR'
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 14. Deduct admin commission from seller and add to admin wallet
const deductAdminCommission = async (req, res) => {
    try {
        const { sellerId, commissionAmount, orderId, bookId, description } = req.body;

        console.log(req.body, 'mmmmmmmmmmmmmmmmmmmmmmmmm');


        // Validate required fields
        if (!sellerId || !commissionAmount) {
            return res.status(400).json({ 
                status: 'fail', 
                message: 'sellerId and commissionAmount are required' 
            });
        }



        // Find seller and admin
        const seller = await Seller.findById(sellerId);
        const admin = await Admin.getFirstAdmin();

        if (!seller) {
            return res.status(404).json({ status: 'fail', message: 'Seller not found' });
        }

        const commission = parseFloat(commissionAmount);
        if (commission <= 0) {
            return res.status(400).json({ status: 'fail', message: 'Commission amount must be greater than 0' });
        }

        // Check if seller can deduct commission using model method
        if (!seller.canDeductCommission(commission)) {
            return res.status(400).json({ 
                status: 'fail', 
                message: seller.block ? 'Seller is blocked' : 'Insufficient seller wallet balance',
                currentBalance: seller.wallet,
                requiredAmount: commission
            });
        }

        // Find or create wallet for seller
        let wallet = await Wallet.findOne({ sellerId });
        if (!wallet) {
            wallet = await Wallet.createWallet(sellerId, seller.wallet);
        }

        // Check if wallet can deduct the amount
        if (!wallet.canDeduct(commission)) {
            return res.status(400).json({ 
                status: 'fail', 
                message: 'Insufficient wallet balance',
                currentBalance: wallet.balance,
                requiredAmount: commission
            });
        }

        // Use model methods for calculations
        const sellerResult = seller.processCommissionDeduction(commission);
        const adminResult = admin.addCommission(commission, description || `Commission from seller ${seller.firstName} ${seller.lastName}`);
        const walletResult = wallet.deductBalance(commission);

        // Save changes
        await seller.save();
        await admin.save();
        await wallet.save();

        // Create transaction record for seller (deduction)
        const sellerTransaction = await Transaction.create({
            sellerId: sellerId,
            type: 'deduction',
            amount: -commission, // Negative amount for deduction
            status: 'completed',
            description: `Admin commission deducted for ${orderId ? 'order' : 'book'}: ${orderId || bookId}`,
            orderId: orderId || null,
            bookId: bookId || null,
            processedBy: admin?._id,
            processedAt: new Date(),
            previousBalance: sellerResult.previousBalance,
            newBalance: sellerResult.newBalance,
            currency: 'SAR',
            notes: `Commission deduction - ${orderId ? 'Order' : 'Book'} ID: ${orderId || bookId}`,
            walletId: wallet._id,
            walletPreviousBalance: walletResult.previousBalance,
            walletNewBalance: walletResult.newBalance
        });

        // Create transaction record for admin (addition)
        const adminTransaction = await Transaction.create({
            sellerId: null, // No seller for admin transaction
            type: 'payment',
            amount: commission, // Positive amount for admin
            status: 'completed',
            description: description || `Admin commission received for ${orderId ? 'order' : 'book'}: ${orderId || bookId}`,
            orderId: orderId || null,
            bookId: bookId || null,
            processedBy: admin?._id,
            processedAt: new Date(),
            previousBalance: adminResult.previousBalance,
            newBalance: adminResult.newBalance,
            currency: 'SAR',
            notes: `Commission received from seller ${seller.firstName} ${seller.lastName} - ${orderId ? 'Order' : 'Book'} ID: ${orderId || bookId}`
        });

        return res.status(200).json({ 
            status: 'ok', 
            message: 'Admin commission deducted successfully',
            data: {
                seller: {
                    id: seller._id,
                    name: `${seller.firstName} ${seller.lastName}`,
                    previousBalance: sellerResult.previousBalance,
                    newBalance: sellerResult.newBalance,
                    deductedAmount: sellerResult.deductedAmount,
                    totalCommissions: seller.totalCommissions
                },
                admin: {
                    id: admin._id,
                    email: admin.email,
                    previousBalance: adminResult.previousBalance,
                    newBalance: adminResult.newBalance,
                    receivedAmount: adminResult.addedAmount,
                    totalCommissions: adminResult.totalCommissions,
                    totalTransactions: adminResult.totalTransactions
                },
                wallet: {
                    id: wallet._id,
                    sellerId: wallet.sellerId,
                    previousBalance: walletResult.previousBalance,
                    newBalance: walletResult.newBalance,
                    deductedAmount: walletResult.deductedAmount,
                    totalSpent: wallet.totalSpent,
                    totalTopup: wallet.totalTopup,
                    currency: wallet.currency,
                    lastTransactionAt: wallet.lastTransactionAt
                },
                transaction: {
                    orderId: orderId || null,
                    bookId: bookId || null,
                    commissionAmount: commission,
                    sellerTransactionId: sellerTransaction._id,
                    adminTransactionId: adminTransaction._id,
                    processedAt: new Date()
                }
            }
        });
    } catch (err) {
        console.error('Commission deduction error:', err);
        if (err.message.includes('No admin found')) {
            return res.status(404).json({ status: 'fail', message: 'Admin not found' });
        }
        res.status(500).json({ error: err.message });
    }
};

// 15. Get commission transactions
const getCommissionTransactions = async (req, res) => {
    try {
        const { sellerId, adminId, orderId, bookId, limit = 50, page = 1 } = req.query;
        
        let filter = {
            $or: [
                { type: 'deduction', description: { $regex: /commission/i } },
                { type: 'payment', description: { $regex: /commission/i } }
            ]
        };

        if (sellerId) filter.sellerId = sellerId;
        if (adminId) filter.processedBy = adminId;
        if (orderId) filter.orderId = orderId;
        if (bookId) filter.bookId = bookId;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const transactions = await Transaction.find(filter)
            .populate('sellerId', 'firstName lastName email')
            .populate('processedBy', 'email')
            .populate('orderId')
            .populate('bookId')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Transaction.countDocuments(filter);

        return res.status(200).json({
            status: 'ok',
            data: {
                transactions,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / parseInt(limit)),
                    totalTransactions: total,
                    limit: parseInt(limit)
                }
            }
        });
    } catch (err) {
        console.error('Get commission transactions error:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addwallet,
    getwallets,
    getwalletById,
    updatewallet,
    deletewallet,
    getwalletBySellerId,
    addFunds,
    deductFunds,
    getSellerWallet,
    getAdminWallet,
    deductFromSellerAddToAdmin,
    getAllSellersWallet,
    getWalletStatistics,
    deductAdminCommission,
    getCommissionTransactions
};
