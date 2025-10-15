const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
    projdetail: {
        type: String,
        allowNull: true,
    },
    materialdetail: {
        type: String,
        allowNull: true,
    },
    materialCost: {
        type: String,
        allowNull: true,
    },
    labourCost: {
        type: String,
        allowNull: true,
    },
    timeRequired: {
        type: String,
        allowNull: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
},{timestamps:true});


const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;
