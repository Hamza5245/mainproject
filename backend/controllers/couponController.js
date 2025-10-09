const Coupon = require('../models/couponModel');

// 1. Create city
const addData = async (req, res) => {
    try {

        const findata= await Coupon.findOne({code:req.body.code})

        if(findata){
        return res.status(200).json({ status: 'fail', message:"Coupon code already exists!" });
        }

        const data = await Coupon.create({...req.body});
        return res.status(200).json({ status: 'ok', data: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all citys
const getAllData = async (req, res) => {
    try {
        const now = new Date();

        // Update all expired coupons → set block: true
        await Coupon.updateMany(
            { expireAt: { $lt: now } }, // expired coupons
            { $set: { block: true } }   // mark as blocked
        );

        // Fetch updated data with service info
        const data = await Coupon.find({}).populate(['categoryId']);

        return res.status(200).json({ status: 'ok', data });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


// 3. Get city by id
const getDataById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Coupon.findById(id);
        return res.status(200).json({ status: 'ok', data: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const getDataByCode = async (req, res) => {
    try {
        const code = req.params.code;
        const categoryId = req.params.categoryId;
        const now = new Date();

        console.log(req.params);
        

        let coupon = await Coupon.findOne({ code, categoryId });

        if (!coupon) {
            return res.status(200).json({ status: 'fail', message: 'Coupon not found' });
        }

        // Check if expired
        if (coupon.expireAt && coupon.expireAt < now) {
            coupon.block = true;
            await coupon.save();
            return res.status(200).json({ status: 'fail', message: 'Coupon expired' });
        }

        // Check remaining uses
        if (coupon.validRemain <= 0) {
            return res.status(200).json({ status: 'fail', message: 'Coupon usage limit reached' });
        }

        // Decrease validRemain by 1 
        coupon.validRemain = coupon.validRemain - 1;
        await coupon.save();

        return res.status(200).json({ status: 'ok', data: coupon });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


// 4. Update city
const updateData = async (req, res) => {
    try {
        let id = req.params.id;


        const data = await Coupon.findByIdAndUpdate(id, 
            { ...req.body,  }, 
            { new: true });
        return res.status(200).json({ status: 'ok', data: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete city
const deleteData = async (req, res) => {
    try {
        const id = req.params.id;
        await Coupon.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'Data deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addData,
    getAllData,
    getDataById,
    updateData,
    deleteData,
    getDataByCode
};
