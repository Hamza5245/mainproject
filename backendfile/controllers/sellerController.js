const { mainUrl } = require("../config/dbConfig");
const Rating = require("../models/ratingModel");
const Seller = require("../models/sellerModel");


// 1. Create seller
const addseller = async (req, res) => {
    try {


        let info = {
            image: req.files.image === undefined ? '' : mainUrl + req.files.image[0].filename,
            frontImage: req.files.frontImage === undefined ? '' : mainUrl + req.files.frontImage[0].filename,
            backImage: req.files.backImage === undefined ? '' : mainUrl + req.files.backImage[0].filename,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            token: req.body.token,
            gender: req.body.gender,
            email: req.body.email,
            phone: req.body.phone,
            countryCode: req.body.countryCode,
            password: req.body.password,
            serviceId: req.body.serviceId,
            idCardNumber: req.body.idCardNumber,
            categoryId: req.body.categoryId,
            address: req.body.address,
            country: req.body.country,
            city: req.body.city,
            lat: req.body.lat,
            lng: req.body.lng,
            block: req.body.block,
            verify: req.body.verify,
        };

        

        const checkemail = await Seller.findOne({ email: info.email });
        const checkphone = await Seller.findOne({ phone: info.phone });

        if (checkemail) {
            return res.status(200).json({ status: 'fail', message: 'Email already exist!' });
        }
        else if (info.phone && checkphone) {
            return res.status(200).json({ status: 'fail', message: 'Phone number already exist!' });
        }
        else {
            console.log(info);
            const seller = await Seller.create(info);
            console.log(seller);
            return res.status(200).json({ status: 'ok', data: seller });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// 2. Get all selleres
const getselleres = async (req, res) => {
    try {
        const selleres = await Seller.find({}).populate(['categoryId','serviceId']);
        return res.status(200).json({ status: 'ok', data: selleres });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};




async function getRatingsForSeller(sellerId) {
    return Rating.find({ sellerId: sellerId });
}

// Function to calculate average rating
function calculateAverageRating(ratings) {
    if (ratings.length === 0) return 0;
    
    const totalRating = ratings.reduce((acc, rating) => (acc) + parseInt(rating?.star), 0);
    const averageRating = totalRating / ((ratings.length)*5);
    
    // Round to the nearest 0.5 to represent a 5-star system
    return parseInt((averageRating) * 5);

}



// 2. Get all selleres
const getselleresApp = async (req, res) => {
    try {


 
        const sellers = await Seller.find();
        for (const seller of sellers) {
            const ratings = await getRatingsForSeller(seller._id);
            if(ratings.length>0){
                const averageRating = calculateAverageRating(ratings);
                seller.averageRating = averageRating;
                await seller.save();
            }
        }

        




        const selleres = await Seller.find({verify:true,country:req.params.country}).populate(['categoryId','serviceId'])


        return res.status(200).json({ status: 'ok', data: selleres });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};






// 3. Get active selleres
const getActiveselleres = async (req, res) => {
    try {
        const selleres = await Seller.find({ block: false });
        return res.status(200).json({ status: 'ok', data: selleres });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};






// 4. Get seller by ID
const getsellerById = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id).populate(['categoryId','serviceId']);
        return res.status(200).json({ status: 'ok', data: seller });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};



// 4. Get seller by ID
const getsellerByemail = async (req, res) => {
    try {
        const seller = await Seller.findOne({ email: req.params.email });
        if (seller) {
            return res.status(200).json({ status: 'fail', message: 'Already register on this email', data: seller });
        } else {
            return res.status(200).json({ status: 'ok', data: seller });

        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


// 4. Get seller by ID
const getsellerByphone = async (req, res) => {
    try {
        const seller = await Seller.findOne({ phone: req.params.phone });
        if (seller) {
            return res.status(200).json({ status: 'fail', message: 'Already register on this phone', data: seller });
        } else {
            return res.status(200).json({ status: 'ok', data: seller });

        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};





// 5. Update seller
const updateseller = async (req, res) => {
    try {

        let id = req.params.id;
        let getImage = await Seller.findById(id);
        const image = req.files.image === undefined ? getImage.image : mainUrl + req.files.image[0].filename;
        const frontImage = req.files.frontImage === undefined ? getImage.frontImage : mainUrl + req.files.frontImage[0].filename;
        const backImage = req.files.backImage === undefined ? getImage.backImage : mainUrl + req.files.backImage[0].filename;



        if(getImage?.phone===req.body.phone && req.body.phone){
            return res.status(200).json({ status: 'fail', message: 'This number is already in someone usage!' });
        }
        else if(getImage?.email===req.body.email && req.body.email){
            return res.status(200).json({ status: 'fail', message: 'This email is already in someone usage!' });
        }
        else{

        const seller = await Seller.findByIdAndUpdate(
            id,
            { ...req.body, image: image, frontImage: frontImage, backImage: backImage },
            { new: true });
        return res.status(200).json({ status: 'ok', data: seller });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// 6. Delete seller
const deleteseller = async (req, res) => {
    try {
        await Seller.findByIdAndDelete(req.params.id);
        return res.status(200).json({ status: 'ok', message: 'seller deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addseller,
    getselleres,
    getActiveselleres,
    getsellerByemail,
    getsellerByphone,
    getsellerById,
    updateseller,
    deleteseller,
    getselleresApp
};
