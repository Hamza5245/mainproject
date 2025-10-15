const Category = require('../models/categoryModel');
const Country = require('../models/countryModel');
const { mainUrl } = require('../config/dbConfig');


// 1. Create category
const addcategory = async (req, res) => {
    try {
        const info = {
            image: mainUrl + req.files.image[0].filename,
            name: req.body.name,
            countryId: req.body.countryId,
            serviceId: req.body.serviceId,
            block: req.body.block,
        };

        const category = await Category.create(info);
        return res.status(200).json({ status: 'ok', data: category });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// 2. Get all categorys
const getcategorys = async (req, res) => {
    try {
        const categorys = await Category.find({}).populate(['countryId','serviceId']);
        return res.status(200).json({ status: 'ok', data: categorys });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// 2. Get all categorys
const getcategorysService = async (req, res) => {
    try {

        const countrys = await Country.findOne({name:req.params.name});

        
        // Assuming `Category` model has fields `serviceId`, `countryId`, and `name`
        const categorys = await Category.find({ serviceId: req.params.serviceId, countryId:countrys?._id }).populate('countryId');
        
        
        return res.status(200).json({ status: 'ok', data: categorys });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// 3. Get category by id
const getcategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        return res.status(200).json({ status: 'ok', data: category });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Update category
const updatecategory = async (req, res) => {
    try {
        let id = req.params.id;
        let getImage = await Category.findById(id);
        const image = req.files.image === undefined ? getImage.image : mainUrl + req.files.image[0].filename;


        const updatedcategory = await Category.findByIdAndUpdate(id, 
            { ...req.body, image: image, }, 
            { new: true });
        return res.status(200).json({ status: 'ok', data: updatedcategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete category
const deletecategory = async (req, res) => {
    try {
        const id = req.params.id;
        await Category.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addcategory,
    getcategorys,
    getcategoryById,
    updatecategory,
    deletecategory,
    getcategorysService
};
