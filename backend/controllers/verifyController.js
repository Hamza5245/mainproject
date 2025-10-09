const Verify = require('../models/verifyModel');



function generateRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000); // Generates a random number between 100000 and 999999
}

// 1. Create verify
const addverify = async (req, res) => {
    try {

        const phoneVerify = await Verify.find({ phone: req.body.phone });

        const randomSixDigitNumber = generateRandomNumber();

        if (phoneVerify.length > 0) {

            const otp = randomSixDigitNumber

            const updatedverify = await Verify.findByIdAndUpdate(phoneVerify[0]?._id,
                { ...req.body, otp: otp },
                { new: true });

            return res.status(200).json({ status: 'ok', data: updatedverify, otp: randomSixDigitNumber });

        } else {
            const info = {
                phone: req.body.phone,
                otp: randomSixDigitNumber,
            };

            const verify = await Verify.create(info);
            return res.status(200).json({ status: 'ok', data: verify, otp: randomSixDigitNumber });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// 2. Get all verifys
const getverifys = async (req, res) => {
    try {
        const verifys = await Verify.find({});
        return res.status(200).json({ status: 'ok', data: verifys });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Get verify by id
const getverifyById = async (req, res) => {
    try {
        const id = req.params.id;
        const verify = await Verify.findById(id);
        return res.status(200).json({ status: 'ok', data: verify });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// 3. Get verify by id
const getverifyByPhone = async (req, res) => {
    try {
        const phone = req.params.phone;
        const otp = req.params.otp;

        const currentTime = new Date();
        // Calculate the time 5 minutes ago
        const sevenMinutesAgo = new Date(currentTime - 7 * 60 * 1000);

        // Find books that meet the criteria
        const booksToDelete = await Verify.find({
            phone:req.params.phone,
            otp:req.params.otp,
            // createdAt: { $lte: sevenMinutesAgo } // Books created more than 5 minutes ago
        });

        // if (booksToDelete.length > 0) {
        //     // Delete the books
        //     await Verify.deleteMany({
        //         _id: { $in: booksToDelete.map(book => book._id) }
        //     });

        //     return res.status(200).json({ status: 'fail', message: 'OTP has been expired. Resend OTP!' });

        // }

        // else {

            const phoneVerify = await Verify.find({ phone: phone, otp: otp });
            if (phoneVerify.length > 0) {

                return res.status(200).json({ status: 'ok', data: phoneVerify, message: 'Verified Successfully!' });
            }
            else {
                return res.status(200).json({ status: 'fail', data: phoneVerify, message: 'Invalid OTP!' });
            }
        // }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// 4. Update verify
const updateverify = async (req, res) => {
    try {
        let id = req.params.id;

        const updatedverify = await Verify.findByIdAndUpdate(id,
            { ...req.body, },
            { new: true });
        return res.status(200).json({ status: 'ok', data: updatedverify });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete verify
const deleteverify = async (req, res) => {
    try {
        const id = req.params.id;
        await Verify.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'Verify deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addverify,
    getverifys,
    getverifyById,
    updateverify,
    deleteverify,
    getverifyByPhone,
};
