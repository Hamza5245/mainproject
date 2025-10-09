const sendCustomNotification = require('../auth/sendCustomNotification');
const Book = require('../models/bookModel');
const Quotation = require('../models/quotationModel');
const Seller = require('../models/sellerModel');
const SubCategory = require('../models/subCategoryModel');
const User = require('../models/userModel');

// 1. Create quotation
const addquotation = async (req, res) => {
    try {
        const info = {
            projdetail: req.body.projdetail,
            materialdetail: req.body.materialdetail,
            materialCost: req.body.materialCost,
            labourCost: req.body.labourCost,
            timeRequired: req.body.timeRequired,
            bookId: req.body.bookId,
            userId: req.body.userId,
        };




        const quotation = await Quotation.create(info);
        const updatedbook = await Book.findByIdAndUpdate(info.bookId,
            { ...req.body, hasQuotation: true },
            { new: true });


        const subCat = await SubCategory.findById(updatedbook?.subCategoryId)
        const myUser = await User.findById(updatedbook?.userId)

        sendCustomNotification('New Quotation', `New quotation made by provider of order ${subCat?.name}`, myUser?.token)


        return res.status(200).json({ status: 'ok', data: quotation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all quotations
const getquotations = async (req, res) => {
    try {
        const quotations = await Quotation.find({});
        return res.status(200).json({ status: 'ok', data: quotations });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// 2. Get all quotations
const getquotationsbook = async (req, res) => {
    try {
        const quotations = await Quotation.findOne({ bookId: req.params.bookId });
        return res.status(200).json({ status: 'ok', data: quotations });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// 3. Get quotation by id
const getquotationById = async (req, res) => {
    try {
        const id = req.params.id;
        const quotation = await Quotation.findById(id);
        return res.status(200).json({ status: 'ok', data: quotation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Update quotation
const updatequotation = async (req, res) => {
    try {
        let id = req.params.id;


        const updatedquotation = await Quotation.findByIdAndUpdate(id,
            { ...req.body, },
            { new: true });
        return res.status(200).json({ status: 'ok', data: updatedquotation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete quotation
const deletequotation = async (req, res) => {
    try {
        const id = req.params.id;
        await Quotation.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'Quotation deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addquotation,
    getquotations,
    getquotationById,
    updatequotation,
    deletequotation,
    getquotationsbook
};
