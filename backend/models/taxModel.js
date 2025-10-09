const mongoose = require('mongoose');

const taxSchema = new mongoose.Schema({
    code: {
        type: String,
        allowNull: true,
    },
    codeDiscount: {
        type: String,
        allowNull: true,
    },
    gst: {
        type: String,
        allowNull: true,
    },
    platformTax: {
        type: String,
        allowNull: true,
    },
},{timestamps:true});


const Tax = mongoose.model('Tax', taxSchema);

module.exports = Tax;
