const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    code: {
        type: String,
        allowNull: true,
    },
    discount: {
        type: Number,
        default: 0,
        allowNull: true,
    },
    validFor: {
        type: Number,
        default: 0,
        allowNull: true,
    },
    validRemain: {
        type: Number,
        default: 0,
        allowNull: true,
    },
    expireAt: {
        type: Date,
        allowNull: true,
    },
    block: {
        type: Boolean,
        allowNull: true,
        default: false
    },
}, { timestamps: true });


const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
