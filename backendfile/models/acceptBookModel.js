const mongoose = require('mongoose');

const acceptBookSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Seller',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book',
    },
},{timestamps:true});


const AcceptBook = mongoose.model('AcceptBook', acceptBookSchema);

module.exports = AcceptBook;
