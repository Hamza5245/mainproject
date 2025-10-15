const Tax = require('../models/taxModel');

// 1. Create tax
const addtax = async (req, res) => {
    try {
        const taxs = await Tax.find({});

        if (taxs.length > 0) {
            // Update the first tax document found
            const updatedtax = await Tax.findByIdAndUpdate(
                taxs[0]._id, // Using the ID of the first tax document
                { ...req.body },
                { new: true }
            );
            return res.status(200).json({ status: 'ok', data: updatedtax, message:'Updated Successfully!' });
        } else {
            const info = {
                code: req.body.code,
                codeDiscount: req.body.codeDiscount,
                gst: req.body.gst,
                plentyTax: req.body.plentyTax,
                serviceTax: req.body.serviceTax,
                platformTax: req.body.platformTax,
                adminTax: req.body.adminTax,
            };

            const tax = await Tax.create(info);
            return res.status(200).json({ status: 'ok', data: tax, message:'Created Successfully!'  });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// 2. Get all taxs
const gettaxs = async (req, res) => {
    try {
        const taxs = await Tax.find({});
        return res.status(200).json({ status: 'ok', data: taxs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// 2. Get all taxs
const gettaxspromo = async (req, res) => {
    try {
        const taxs = await Tax.findOne({code:req.params.code});
        if(taxs){
            return res.status(200).json({ status: 'ok', data: taxs, message:`You get discount of ${taxs.codeDiscount}%.` });
        }
        else{
            return res.status(200).json({ status: 'fail', data: taxs, message:`No promo code found!` });

        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// 3. Get tax by id
const gettaxById = async (req, res) => {
    try {
        const id = req.params.id;
        const tax = await Tax.findById(id);
        return res.status(200).json({ status: 'ok', data: tax });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Update tax
const updatetax = async (req, res) => {
    try {
        let id = req.params.id;


        const updatedtax = await Tax.findByIdAndUpdate(id,
            { ...req.body, },
            { new: true });
        return res.status(200).json({ status: 'ok', data: updatedtax });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete tax
const deletetax = async (req, res) => {
    try {
        const id = req.params.id;
        await Tax.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'Tax deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addtax,
    gettaxs,
    gettaxById,
    updatetax,
    deletetax,
    gettaxspromo
};
