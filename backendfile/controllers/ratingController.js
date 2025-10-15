const Rating = require('../models/ratingModel');

// 1. Create rating
const addrating = async (req, res) => {
    try {

        const info = {
            userId: req.body.userId,
            sellerId: req.body.sellerId,
            bookId: req.body.bookId,
            star: req.body.star,
        };


        const ratings = await Rating.findOne({ bookId: info.bookId, userId: info.userId });

        if (ratings) {

            const updatedrating = await Rating.findByIdAndUpdate(ratings?._id,
                { ...req.body, },
                { new: true });
            return res.status(200).json({ status: 'ok', data: updatedrating, message: 'Your rating has been updated.' });
        }

        else {

            const rating = await Rating.create(info);
            return res.status(200).json({ status: 'ok', data: rating, message: 'Rating has been added on the service.' });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all ratings
const getratings = async (req, res) => {
    try {
        const ratings = await Rating.find({});
        return res.status(200).json({ status: 'ok', data: ratings });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// 2. Get all ratings
const getbookratings = async (req, res) => {
    try {
        const ratings = await Rating.findOne({ bookId: req.params.bookId, userId: req.params.userId });
        return res.status(200).json({ status: 'ok', data: ratings });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Get rating by id
const getratingById = async (req, res) => {
    try {
        const id = req.params.id;
        const rating = await Rating.findById(id);
        return res.status(200).json({ status: 'ok', data: rating });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Update rating
const updaterating = async (req, res) => {
    try {
        let id = req.params.id;


        const updatedrating = await Rating.findByIdAndUpdate(id,
            { ...req.body, },
            { new: true });
        return res.status(200).json({ status: 'ok', data: updatedrating });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete rating
const deleterating = async (req, res) => {
    try {
        const id = req.params.id;
        await Rating.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'Rating deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addrating,
    getratings,
    getratingById,
    updaterating,
    deleterating,
    getbookratings
};
