const User = require('../models/userModel');
const Seller = require('../models/sellerModel');
const { compareSync, hashSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { KEY_NAME } = require('../config/dbConfig');


const loginuser = async (req, res) => {
    try {
        console.log(req.body);
        let info = {
            phone: req.body.phone,
            password: req.body.password,
        };

        const userData = await User.findOne({ phone: info.phone });

        if (userData) {
            const ispasswordMatch = await User.findOne({ password: info.password });
            if (ispasswordMatch) {
                // Generate JWT token for authentication
                const token = sign({ id: userData._id, phone: userData.phone }, KEY_NAME, { expiresIn: '1h' });

                res.status(200).json({
                    status: 'ok',
                    message: "Successfully logged in",
                    token: token,
                    data: userData,
                });
            } else {
                res.status(200).json({
                    status: 'fail',
                    message: 'Wrong Password',
                });
            }
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Phone number not found',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};







const loginseller = async (req, res) => {
    try {
        console.log(req.body);
        let info = {
            phone: req.body.phone,
            password: req.body.password,
        };

        const userData = await Seller.findOne({ phone: info.phone });

        if (userData) {
            const ispasswordMatch = await Seller.findOne({ password: info.password });
            if (ispasswordMatch) {
                // Generate JWT token for authentication
                const token = sign({ id: userData._id, phone: userData.phone }, KEY_NAME, { expiresIn: '1h' });

                res.status(200).json({
                    status: 'ok',
                    message: "Successfully logged in",
                    token: token,
                    data: userData,
                });
            } else {
                res.status(200).json({
                    status: 'fail',
                    message: 'Wrong Password',
                });
            }
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Phone number not found',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};






const verifyuser = async (req, res) => {

    try {

        console.log(req.params);
        
        const userData = await User.findOne({ phone: req.params.phone });
        console.log(userData);

        if (userData) {
            return res.status(200).json({
                status: 'ok',
                message: "Verified successfully!",
                data: userData,
            });
        } else {
            return res.status(200).json({
                status: 'fail',
                message: 'Phone number not found',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};











const forgetuserloginPassword = async (req, res) => {
    try {
        let info = {
            phone: req.body.phone,
            password: req.body.password,
        };

        const guser = await User.findOne(info);

        if (guser) {
            res.status(200).json({
                status: 'ok',
                data: guser,
            });
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'First Register yourself!',
            });
        } 
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};




const updateuserloginPassword = async (req, res) => {
    try {
        let info = {
            phone: req.body.phone,
            password: req.body.password,
        };

        console.log(req.body);

            // Hash the new password before updating

            await User.findOneAndUpdate({ phone: info.phone }, { password: info.password });

            return res.status(200).json({
                status: 'ok',
                message: 'Updated Successfully',
            });
        
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};



const updatesellerloginPassword = async (req, res) => {
    try {
        let info = {
            phone: req.body.phone,
            password: req.body.password,
        };

        console.log(req.body);


            await Seller.findOneAndUpdate({ phone: info.phone }, { password: info.password });

            return res.status(200).json({
                status: 'ok',
                message: 'Updated Successfully',
            });
        
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};




module.exports = {
    loginuser,
    loginseller,
    verifyuser,
    forgetuserloginPassword,
    updateuserloginPassword,
    updatesellerloginPassword
};
