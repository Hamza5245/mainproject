const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        allowNull: true,
    },
    balance: {
        type: Number,
        allowNull: true,
        default: 0,
    },
    totalTopup: {
        type: Number,
        allowNull: true,
        default: 0,
    },
    totalSpent: {
        type: Number,
        allowNull: true,
        default: 0,
    },
    currency: {
        type: String,
        allowNull: true,
        default: 'SAR',
    },
    isActive: {
        type: Boolean,
        allowNull: true,
        default: true,
    },
    lastTransactionAt: {
        type: Date,
        allowNull: true,
    },
},{timestamps:true});

// Instance methods for wallet calculations
walletSchema.methods.addBalance = function(amount) {
    if (amount <= 0) {
        throw new Error('Amount must be greater than 0');
    }
    
    const previousBalance = this.balance;
    this.balance += amount;
    this.totalTopup += amount;
    this.lastTransactionAt = new Date();
    
    return {
        previousBalance,
        newBalance: this.balance,
        addedAmount: amount
    };
};

walletSchema.methods.deductBalance = function(amount) {
    if (amount <= 0) {
        throw new Error('Amount must be greater than 0');
    }
    
    if (this.balance < amount) {
        throw new Error('Insufficient balance');
    }
    
    const previousBalance = this.balance;
    this.balance -= amount;
    this.totalSpent += amount;
    this.lastTransactionAt = new Date();
    
    return {
        previousBalance,
        newBalance: this.balance,
        deductedAmount: amount
    };
};

walletSchema.methods.getBalance = function() {
    return {
        currentBalance: this.balance,
        totalTopup: this.totalTopup,
        totalSpent: this.totalSpent,
        currency: this.currency,
        isActive: this.isActive,
        lastTransactionAt: this.lastTransactionAt
    };
};

walletSchema.methods.canDeduct = function(amount) {
    return this.isActive && this.balance >= amount && amount > 0;
};

// Static methods for wallet operations
walletSchema.statics.createWallet = function(sellerId, initialBalance = 0) {
    return this.create({
        sellerId,
        balance: initialBalance,
        totalTopup: initialBalance,
        totalSpent: 0,
        currency: 'SAR',
        isActive: true,
        lastTransactionAt: new Date()
    });
};

walletSchema.statics.getWalletBySeller = async function(sellerId) {
    return await this.findOne({ sellerId }).populate('sellerId');
};

walletSchema.statics.transferBalance = async function(fromSellerId, toSellerId, amount) {
    const fromWallet = await this.getWalletBySeller(fromSellerId);
    const toWallet = await this.getWalletBySeller(toSellerId);
    
    if (!fromWallet || !toWallet) {
        throw new Error('One or both wallets not found');
    }
    
    if (!fromWallet.canDeduct(amount)) {
        throw new Error('Insufficient balance in source wallet');
    }
    
    const fromResult = fromWallet.deductBalance(amount);
    const toResult = toWallet.addBalance(amount);
    
    await fromWallet.save();
    await toWallet.save();
    
    return {
        from: fromResult,
        to: toResult,
        transferAmount: amount
    };
};

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
