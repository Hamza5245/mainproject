const SubCategory = require('../models/subCategoryModel');
const { mainUrl } = require('../config/dbConfig');


// 1. Create subCategory
const addsubCategory = async (req, res) => {
    try {
        
        const info = {
            image: req.files.image === undefined ?'':mainUrl + req.files.image[0].filename,
            name: req.body.name,
            warranty: req.body.warranty,
            type: req.body.type,
            about: req.body.about,
            priceSuggest: req.body.priceSuggest,
            categoryId: req.body.categoryId,
            block: req.body.block,
        };

        const subCategory = await SubCategory.create(info);
        return res.status(200).json({ status: 'ok', data: subCategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all subCategorys
const getsubCategorys = async (req, res) => {
    try {
        const subCategorys = await SubCategory.find({}).populate(['categoryId']);;
        return res.status(200).json({ status: 'ok', data: subCategorys });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




const getsubCategorysCategory = async (req, res) => {
    try {
        const subCategorys = await SubCategory.find({categoryId:req.params.id});
        return res.status(200).json({ status: 'ok', data: subCategorys });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Get subCategory by id
const getsubCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const subCategory = await SubCategory.findById(id);
        return res.status(200).json({ status: 'ok', data: subCategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Update subCategory
const updatesubCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let getImage = await SubCategory.findById(id);
        const image = req.files.image === undefined ? getImage.image : mainUrl + req.files.image[0].filename;


        const updatedsubCategory = await SubCategory.findByIdAndUpdate(id, 
            { ...req.body, image: image, }, 
            { new: true });
        return res.status(200).json({ status: 'ok', data: updatedsubCategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete subCategory
const deletesubCategory = async (req, res) => {
    try {
        const id = req.params.id;
        await SubCategory.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'subCategory deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addsubCategory,
    getsubCategorys,
    getsubCategoryById,
    updatesubCategory,
    deletesubCategory,
    getsubCategorysCategory
};
