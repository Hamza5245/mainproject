const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        allowNull: true,
    },
    about: {
        type: String,
        allowNull: true,
    },
    type: {
        type: String,
        allowNull: true,
    },
    priceSuggest: {
        type: String,
        allowNull: true,
    },
    warranty: {
        type: String,
        allowNull: true,
    },
    image: {
        type: String,
        allowNull: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },
    block: {
        type: Boolean,
        allowNull: true,
    },
},{timestamps:true});


const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
