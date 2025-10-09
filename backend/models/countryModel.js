const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        allowNull: true,
    },
    unit: {
        type: String,
        allowNull: true,
    },
   
    block: {
        type: Boolean,
        allowNull: true,
    },
},{timestamps:true});


const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
