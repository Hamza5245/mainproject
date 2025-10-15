const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        allowNull: true,
    },
    block: {
        type: Boolean,
        allowNull: true,
    },
},{timestamps:true});


const City = mongoose.model('City', citySchema);

module.exports = City;
