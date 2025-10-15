const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Seller',
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book',
    },
    star: {
        type: String,
        allowNull: true,
    },
},{timestamps:true});


const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
