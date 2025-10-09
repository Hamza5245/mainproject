const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    image: {
        type: String,
        allowNull: true,
    },
    
},{timestamps:true});


const Slider = mongoose.model('Slider', sliderSchema);

module.exports = Slider;
