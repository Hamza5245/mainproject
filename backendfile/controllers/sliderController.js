const Slider = require('../models/sliderModel');
const Country = require('../models/countryModel');
const { mainUrl } = require('../config/dbConfig');


// 1. Create slider
const addslider = async (req, res) => {
    try {
        const info = {
            image: mainUrl + req.files.image[0].filename,
        };

        const slider = await Slider.create(info);
        return res.status(200).json({ status: 'ok', data: slider });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// 2. Get all sliders
const getsliders = async (req, res) => {
    try {
        const sliders = await Slider.find({});
        return res.status(200).json({ status: 'ok', data: sliders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// 3. Get slider by id
const getsliderById = async (req, res) => {
    try {
        const id = req.params.id;
        const slider = await Slider.findById(id);
        return res.status(200).json({ status: 'ok', data: slider });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Update slider
const updateslider = async (req, res) => {
    try {
        let id = req.params.id;
        let getImage = await Slider.findById(id);
        const image = req.files.image === undefined ? getImage.image : mainUrl + req.files.image[0].filename;


        const updatedslider = await Slider.findByIdAndUpdate(id, 
            { ...req.body, image: image, }, 
            { new: true });
        return res.status(200).json({ status: 'ok', data: updatedslider });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete slider
const deleteslider = async (req, res) => {
    try {
        const id = req.params.id;
        await Slider.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'slider deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addslider,
    getsliders,
    getsliderById,
    updateslider,
    deleteslider,
};
