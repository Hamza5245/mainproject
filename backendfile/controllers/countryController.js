const Country = require('../models/countryModel');



// 1. Create country
const addcountry = async (req, res) => {
    try {
        const info = {
            name: req.body.name,
            unit: req.body.unit,
            block: req.body.block,
        };

        const checkcountry = await Country.findOne({ name: info.name });

        if (checkcountry) {
            return res.status(200).json({ status: 'fail', message: 'Country name already exist!' });
        }
        else {
            const country = await Country.create(info);
            return res.status(200).json({ status: 'ok', data: country });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all countrys
const getcountrys = async (req, res) => {
    try {
        const countrys = await Country.find({});
        return res.status(200).json({ status: 'ok', data: countrys });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Get country by id
const getcountryById = async (req, res) => {
    try {
        const id = req.params.id;
        const country = await Country.findById(id);
        return res.status(200).json({ status: 'ok', data: country });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Update country
const updatecountry = async (req, res) => {
    try {
        let id = req.params.id;
        let getImage = await Country.findById(id);


        const updatedcountry = await Country.findByIdAndUpdate(id,
            { ...req.body, },
            { new: true });
        return res.status(200).json({ status: 'ok', data: updatedcountry });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete country
const deletecountry = async (req, res) => {
    try {
        const id = req.params.id;
        await Country.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'country deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addcountry,
    getcountrys,
    getcountryById,
    updatecountry,
    deletecountry
};
