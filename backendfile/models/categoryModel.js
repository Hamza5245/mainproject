const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        allowNull: true,
    },
    image: {
        type: String,
        allowNull: true,
    },
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Country',
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Service',
    },
    block: {
        type: Boolean,
        allowNull: true,
    },
},{timestamps:true});


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
