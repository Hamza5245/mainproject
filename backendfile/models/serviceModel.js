const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        allowNull: true,
    },
    image: {
        type: String,
        allowNull: true,
    },
    block: {
        type: Boolean,
        allowNull: true,
    },
},{timestamps:true});


const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
