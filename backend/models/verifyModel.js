const mongoose = require('mongoose');

const verifySchema = new mongoose.Schema({
    phone: {
        type: String,
        allowNull: true,
    },
    otp: {
        type: String,
        allowNull: true,
    },
},{timestamps:true});


const Verify = mongoose.model('Verify', verifySchema);

module.exports = Verify;
