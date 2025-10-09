const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    day: {
        type: String,
        allowNull: true,
    },
    year: {
        type: String,
        allowNull: true,
    },
    address: {
        type: String,
        allowNull: true,
    },
    dayName: {
        type: String,
        allowNull: true,
    },
    time: {
        type: String,
        allowNull: true,
    },
    bookDate: {
        type: String,
        allowNull: true,
    },
    info: {
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
    country: {
        type: String,
        allowNull: true,
    },
    city: {
        type: String,
        allowNull: true,
    },
    state: {
        type: String,
        allowNull: true,
    },
    remainingWarranty: {
        type: String,
        allowNull: true,
        // This field tracks remaining warranty days, automatically updated when state = 'WorkCompl'
    },
    discount: {
        type: String,
        allowNull: true,
    },
    gst: {
        type: String,
        allowNull: true,
    },
    plentyTax: {
        type: String,
        allowNull: true,
    },
    adminTax: {
        type: String,
        allowNull: true,
    },
    serviceTax: {
        type: String,
        allowNull: true,
    },
    platformTax: {
        type: String,
        allowNull: true,
    },
    bill: {
        type: String,
        allowNull: true,
    },
    totalBill: {
        type: String,
        allowNull: true,
    },
    image1: {
        type: String, // Assuming serviceAccess is an array of strings
        allowNull: true,
    },
    image2: {
        type: String, // Assuming serviceAccess is an array of strings
        allowNull: true,
    },
    image3: {
        type: String, // Assuming serviceAccess is an array of strings
        allowNull: true,
    },
    image4: {
        type: String, // Assuming serviceAccess is an array of strings
        allowNull: true,
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'SubCategory',
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Seller',
    },
    requestBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:'Seller',
        default: [],
    },
    cancelBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:'Seller',
        default: [],
    },
    approve: {
        type: Boolean,
        allowNull: true,
    },
    hasQuotation: {
        type: Boolean,
        allowNull: true,
    },
    reClaim: {
        type: Boolean,
        allowNull: true,
        default: false,
    },
    orderCompleteDate:{ 
        type: Date, 
        allowNull: true,
        // Date when work was completed, used to calculate warranty expiration
    },
    orderCancelDate:{ 
        type: Date, 
        allowNull: true,
        // Date when work was completed, used to calculate warranty expiration
    },
    claimDate: {
        type: Date,
        allowNull: true,
        // Date when claim was made
    },
    claimCount: {
        type: Number,
        default: 0,
        // Number of times this order has been claimed
    },
},{timestamps:true});


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
