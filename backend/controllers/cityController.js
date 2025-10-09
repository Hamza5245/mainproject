const City = require('../models/cityModel');

// 1. Create city
const addcity = async (req, res) => {
    try {
        const info = {
            name: req.body.name,
            block: req.body.block,
        };

        const city = await City.create(info);
        return res.status(200).json({ status: 'ok', data: city });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all citys
const getcitys = async (req, res) => {
    try {
        const citys = await City.find({});
        return res.status(200).json({ status: 'ok', data: citys });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Get city by id
const getcityById = async (req, res) => {
    try {
        const id = req.params.id;
        const city = await City.findById(id);
        return res.status(200).json({ status: 'ok', data: city });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Update city
const updatecity = async (req, res) => {
    try {
        let id = req.params.id;


        const updatedcity = await City.findByIdAndUpdate(id, 
            { ...req.body,  }, 
            { new: true });
        return res.status(200).json({ status: 'ok', data: updatedcity });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete city
const deletecity = async (req, res) => {
    try {
        const id = req.params.id;
        await City.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'city deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addcity,
    getcitys,
    getcityById,
    updatecity,
    deletecity
};
