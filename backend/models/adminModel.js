const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        allowNull: true,
    },
    password: {
        type: String,
        allowNull: true,
    },
    wallet: {
        type: Number,
        allowNull: true,
        default: 0,
    },
    totalDeducted: {
        type: Number,
        allowNull: true,
        default: 0,
    },
    totalCommissions: {
        type: Number,
        allowNull: true,
        default: 0,
    },
    totalTransactions: {
        type: Number,
        allowNull: true,
        default: 0,
    },
    lastCommissionAt: {
        type: Date,
        allowNull: true,
    },
},{timestamps:true});


// Instance methods for admin commission calculations
adminSchema.methods.addCommission = function(amount, description = 'Commission received') {
    if (amount <= 0) {
        throw new Error('Commission amount must be greater than 0');
    }
    
    const previousBalance = this.wallet;
    this.wallet += amount;
    this.totalCommissions += amount;
    this.totalTransactions += 1;
    this.lastCommissionAt = new Date();
    
    return {
        previousBalance,
        newBalance: this.wallet,
        addedAmount: amount,
        totalCommissions: this.totalCommissions,
        totalTransactions: this.totalTransactions
    };
};

adminSchema.methods.getCommissionStats = function() {
    return {
        currentBalance: this.wallet,
        totalCommissions: this.totalCommissions,
        totalTransactions: this.totalTransactions,
        lastCommissionAt: this.lastCommissionAt,
        averageCommission: this.totalTransactions > 0 ? this.totalCommissions / this.totalTransactions : 0
    };
};

adminSchema.methods.canProcessCommission = function(amount) {
    return amount > 0 && typeof amount === 'number' && !isNaN(amount);
};

// Static methods for admin operations
adminSchema.statics.getFirstAdmin = async function() {
    const admin = await this.findOne().sort({ createdAt: 1 });
    if (!admin) {
        throw new Error('No admin found');
    }
    return admin;
};

adminSchema.statics.createAdmin = function(email, password, initialBalance = 0) {
    return this.create({
        email,
        password,
        wallet: initialBalance,
        totalDeducted: 0,
        totalCommissions: 0,
        totalTransactions: 0,
        lastCommissionAt: new Date()
    });
};

adminSchema.statics.processCommissionDeduction = async function(sellerId, commissionAmount, orderId, bookId, description) {
    const admin = await this.getFirstAdmin();
    
    if (!admin.canProcessCommission(commissionAmount)) {
        throw new Error('Invalid commission amount');
    }
    
    const commissionResult = admin.addCommission(commissionAmount, description);
    await admin.save();
    
    return {
        admin,
        commissionResult,
        orderId,
        bookId,
        processedAt: new Date()
    };
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
