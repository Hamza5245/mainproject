const Service = require('../models/serviceModel');
const { mainUrl } = require('../config/dbConfig');

// 1. Create service
const addservice = async (req, res) => {
    try {
        const info = {
            image: req.files.image === undefined ?'':mainUrl + req.files.image[0].filename,
            name: req.body.name,
            block: req.body.block,
        };

        const service = await Service.create(info);
        return res.status(200).json({ status: 'ok', data: service });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all services
const getservices = async (req, res) => {
    try {
        const services = await Service.find({});
        return res.status(200).json({ status: 'ok', data: services });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// 3. Get service by id
const getserviceById = async (req, res) => {
    try {
        const id = req.params.id;
        const service = await Service.findById(id);
        return res.status(200).json({ status: 'ok', data: service });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Update service
const updateservice = async (req, res) => {
    try {
        let id = req.params.id;
        let getImage = await Service.findById(id);
        const image = req.files.image === undefined ? getImage.image : mainUrl + req.files.image[0].filename;


        const updatedservice = await Service.findByIdAndUpdate(id, 
            { ...req.body, image: image, }, 
            { new: true });
        return res.status(200).json({ status: 'ok', data: updatedservice });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete service
const deleteservice = async (req, res) => {
    try {
        const id = req.params.id;
        await Service.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'Service deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addservice,
    getservices,
    getserviceById,
    updateservice,
    deleteservice
};
