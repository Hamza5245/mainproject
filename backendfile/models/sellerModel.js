const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        allowNull: true,
    },
    lastName: {
        type: String,
        allowNull: true,
    },
    token: {
        type: String,
        allowNull: true,
    },
    gender: {
        type: String,
        allowNull: true,
    },
    email: {
        type: String,
        allowNull: true,
    },
    phone: {
        type: String,
        allowNull: true,
    },
    countryCode: {
        type: String,
        allowNull: true,
    },
    password: {
        type: String,
        allowNull: true,
    },
    idCardNumber: {
        type: String,
        allowNull: true,
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Service',
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },
    image: {
        type: String,
        allowNull: true,
    },
    frontImage: {
        type: String,
        allowNull: true,
    },
    backImage: {
        type: String,
        allowNull: true,
    },
    address: {
        type: String,
        allowNull: true,
    },
    country: {
        type: String,
        allowNull: true,
    },
    city: {
        type: String,
        allowNull: true,
    },
    averageRating: {
        type: String,
        allowNull: true,
    },
    lat: {
        type: String,
        allowNull: true,
    },
    lng: {
        type: String,
        allowNull: true,
    },
    verify: {
        type: Boolean,
        allowNull: true,
        default:false
    },
    block: {
        type: Boolean,
        allowNull: true,
    },
    wallet: {
        type: Number,
        allowNull: true,
        default: 0,
    },
    totalEarnings: {
        type: Number,
        allowNull: true,
        default: 0,
    },
    totalCommissions: {
        type: Number,
        allowNull: true,
        default: 0,
    },
    totalWithdrawals: {
        type: Number,
        allowNull: true,
        default: 0,
    },
    lastWalletUpdate: {
        type: Date,
        allowNull: true,
    },
},{timestamps:true});



// Instance methods for seller wallet calculations
sellerSchema.methods.addToWallet = function(amount, type = 'earning') {
    if (amount <= 0) {
        throw new Error('Amount must be greater than 0');
    }
    
    const previousBalance = this.wallet;
    this.wallet += amount;
    this.lastWalletUpdate = new Date();
    
    // Update specific totals based on type
    switch (type) {
        case 'earning':
            this.totalEarnings += amount;
            break;
        case 'commission':
            this.totalCommissions += amount;
            break;
        default:
            this.totalEarnings += amount;
    }
    
    return {
        previousBalance,
        newBalance: this.wallet,
        addedAmount: amount,
        type
    };
};

sellerSchema.methods.deductFromWallet = function(amount, type = 'commission') {
    if (amount <= 0) {
        throw new Error('Amount must be greater than 0');
    }
    
    if (this.wallet < amount) {
        throw new Error('Insufficient wallet balance');
    }
    
    const previousBalance = this.wallet;
    this.wallet -= amount;
    this.lastWalletUpdate = new Date();
    
    // Update specific totals based on type
    switch (type) {
        case 'commission':
            this.totalCommissions += amount;
            break;
        case 'withdrawal':
            this.totalWithdrawals += amount;
            break;
        default:
            this.totalCommissions += amount;
    }
    
    return {
        previousBalance,
        newBalance: this.wallet,
        deductedAmount: amount,
        type
    };
};

sellerSchema.methods.getWalletInfo = function() {
    return {
        currentBalance: this.wallet,
        totalEarnings: this.totalEarnings,
        totalCommissions: this.totalCommissions,
        totalWithdrawals: this.totalWithdrawals,
        lastWalletUpdate: this.lastWalletUpdate,
        netEarnings: this.totalEarnings - this.totalCommissions - this.totalWithdrawals
    };
};

sellerSchema.methods.canDeductCommission = function(amount) {
    return !this.block && this.wallet >= amount && amount > 0;
};

sellerSchema.methods.processCommissionDeduction = function(commissionAmount) {
    if (!this.canDeductCommission(commissionAmount)) {
        throw new Error('Cannot process commission deduction');
    }
    
    return this.deductFromWallet(commissionAmount, 'commission');
};

// Static methods for seller operations
sellerSchema.statics.findByEmail = async function(email) {
    return await this.findOne({ email });
};

sellerSchema.statics.findByPhone = async function(phone) {
    return await this.findOne({ phone });
};

sellerSchema.statics.getVerifiedSellers = async function() {
    return await this.find({ verify: true, block: { $ne: true } });
};

sellerSchema.statics.getSellerStats = async function() {
    const stats = await this.aggregate([
        {
            $group: {
                _id: null,
                totalSellers: { $sum: 1 },
                verifiedSellers: { $sum: { $cond: ['$verify', 1, 0] } },
                blockedSellers: { $sum: { $cond: ['$block', 1, 0] } },
                totalWalletBalance: { $sum: '$wallet' },
                totalEarnings: { $sum: '$totalEarnings' },
                totalCommissions: { $sum: '$totalCommissions' },
                averageRating: { $avg: { $toDouble: '$averageRating' } }
            }
        }
    ]);
    
    return stats[0] || {
        totalSellers: 0,
        verifiedSellers: 0,
        blockedSellers: 0,
        totalWalletBalance: 0,
        totalEarnings: 0,
        totalCommissions: 0,
        averageRating: 0
    };
};

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
