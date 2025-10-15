const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Seller',
    },
    seen: {
        type: Boolean,
        allowNull: true,
    },
},{timestamps:true});


const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
