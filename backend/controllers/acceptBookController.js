const AcceptBook = require('../models/acceptBookModel');
const Book = require('../models/bookModel');



// 1. Create acceptBook
const addacceptBook = async (req, res) => {
    try {
        const info = {
            sellerId: req.body.sellerId,
            userId: req.body.userId,
            bookId: req.body.bookId,
        };


        const acceptBook = await AcceptBook.create(info);
        return res.status(200).json({ status: 'ok', data: acceptBook });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all acceptBooks
const getacceptBooks = async (req, res) => {
    try {
        const acceptBooks = await AcceptBook.find({}).populate([{path:'bookId',populate:{path:'subCategoryId'}},{path:'sellerId'}]);
        return res.status(200).json({ status: 'ok', data: acceptBooks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// 2. Get all acceptBooks
const getacceptBooksUser = async (req, res) => {
    try {
        const acceptBooks = await AcceptBook.find({ userId: req.params.userId })
            .populate({
                path: 'bookId',
                populate: { path: 'assignTo' },
                populate: { path: 'categoryId' }, 
                populate: { path: 'subCategoryId' }, 
            })
            .populate('sellerId');
            
        return res.status(200).json({ status: 'ok', data: acceptBooks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





// 3. Get acceptBook by id
const getacceptBookById = async (req, res) => {
    try {
        const id = req.params.id;
        const acceptBook = await AcceptBook.findById(id);
        return res.status(200).json({ status: 'ok', data: acceptBook });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Update acceptBook
const updateacceptBook = async (req, res) => {
    try {
        let id = req.params.id;
        let getImage = await AcceptBook.findById(id);


        const updatedacceptBook = await AcceptBook.findByIdAndUpdate(id,
            { ...req.body, },
            { new: true });
        return res.status(200).json({ status: 'ok', data: updatedacceptBook });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete acceptBook
const deleteacceptBook = async (req, res) => {
    try {
        const id = req.params.id;

        const acceptBook = await AcceptBook.findById(id);

        const book = await Book.findById(acceptBook?.bookId);
        // Add the sellerId to the requestBy array and save the book
        book.requestBy.pop(acceptBook?.sellerId);
        await book.save();


        await AcceptBook.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'acceptBook deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// 5. Delete acceptBook
const deleteacceptBookSingle = async (req, res) => {
    try {
        const id = req.params.id;

        await AcceptBook.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'acceptBook deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addacceptBook,
    getacceptBooks,
    getacceptBookById,
    updateacceptBook,
    deleteacceptBook,
    getacceptBooksUser,
    deleteacceptBookSingle
};
