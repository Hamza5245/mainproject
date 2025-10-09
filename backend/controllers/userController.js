const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const { mainUrl } = require('../config/dbConfig');





    


// 1. Create user
const adduser = async (req, res) => {
    try {



        const info = {
            image: req.files.image === undefined ?'':mainUrl + req.files.image[0].filename,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            token: req.body.token,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            address: req.body.address,
            country: req.body.country,
            countryCode: req.body.countryCode,
            city: req.body.city,
            lat: req.body.lat,
            lng: req.body.lng,
            block: req.body.block,
        };



        const checkemail = await User.findOne({ email: info.email });
        const checkphone = await User.findOne({ phone: info.phone });

        if(checkemail){
            return res.status(200).json({ status: 'fail', message: 'Email already exist!' });
        }
        else if(info.phone && checkphone){
            return res.status(200).json({ status: 'fail', message: 'Phone number already exist!' });
        }
        else{
            const user = await User.create(info);
            return res.status(200).json({ status: 'ok', data: user });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });




// 2. Get all users
const getadmins = async (req, res) => {
    try {
        const users = await Admin.findOne({ email: 'admin@gmail.com' });
        return res.status(200).json({ status: 'ok', data: users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// 2. Get all users
const getusers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ status: 'ok', data: users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Get user by id
const getuserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        return res.status(200).json({ status: 'ok', data: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





// 4. Get seller by ID
const getuserByemail = async (req, res) => {
    try {
        const seller = await User.findOne({ email: req.params.email });
        if (seller) {
            return res.status(200).json({ status: 'fail', message: 'Already register on this email', data: seller });
        } else {
            return res.status(200).json({ status: 'ok', data: seller });

        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};




// 4. Update user
const updateuser = async (req, res) => {
    try {
        let id = req.params.id;
        let getImage = await User.findById(id);
        const image = req.files.image === undefined ? getImage.image : mainUrl + req.files.image[0].filename;


        if(getImage?.phone===req.body.phone && req.body.phone){
            return res.status(200).json({ status: 'fail', message: 'This number is already in someone usage!' });
        }
        else if(getImage?.email===req.body.email && req.body.email){
            return res.status(200).json({ status: 'fail', message: 'This email is already in someone usage!' });
        }
        else{
            const updateduser = await User.findByIdAndUpdate(id, 
                { ...req.body, image: image, }, 
                { new: true });
            return res.status(200).json({ status: 'ok', data: updateduser });
        }


        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete user
const deleteuser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'user deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    adduser,
    getusers,
    getuserById,
    updateuser,
    deleteuser,
    getuserByemail,
    getadmins
};
