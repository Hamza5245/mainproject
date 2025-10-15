const { mainUrl } = require('../config/dbConfig');
const Book = require('../models/bookModel');
const AcceptBook = require('../models/acceptBookModel');
const SubCategory = require('../models/subCategoryModel');
const Seller = require('../models/sellerModel');
const User = require('../models/userModel');
const sendCustomNotification = require('../auth/sendCustomNotification');
const socketService = require('../services/socketService');

// 1. Create book
const addbook = async (req, res) => {
    try {


        const info = {
            image1: req.files.image1 === undefined ? '' : mainUrl + req.files.image1[0].filename,
            image2: req.files.image2 === undefined ? '' : mainUrl + req.files.image2[0].filename,
            image3: req.files.image3 === undefined ? '' : mainUrl + req.files.image3[0].filename,
            image4: req.files.image4 === undefined ? '' : mainUrl + req.files.image4[0].filename,
            day: req.body.day,
            dayName: req.body.dayName,
            time: req.body.time,
            bookDate: req.body.bookDate,
            discount: req.body.discount,
            info: req.body.info,
            year: req.body.year,
            lat: req.body.lat,
            lng: req.body.lng,
            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
            state: req.body.state,
            remainingWarranty: req.body.remainingWarranty,
            subCategoryId: req.body.subCategoryId,
            categoryId: req.body.categoryId,
            userId: req.body.userId,
            assignTo: req.body.assignTo,
            requestBy: req.body.requestBy,
            cancelBy: req.body.cancelBy,
            approve: req.body.approve,
            gst: req.body.gst,
            plentyTax: req.body.plentyTax,
            adminTax: req.body.adminTax,
            bill: req.body.bill,
            totalBill: req.body.totalBill,
            hasQuotation: req.body.hasQuotation,
            orderCompleteDate: req.body.orderCompleteDate,
        };



        const allSeler = await Seller.find({
            categoryId: info.categoryId
        })


        const subCat = await SubCategory.findById(info?.subCategoryId)




        allSeler.map(i => {
            sendCustomNotification('New Order', `You got new order of ${subCat?.name}`, i?.token)
        })





        const book = await Book.create(info);
        
        // Emit socket event to notify sellers about new order
        try {
            const populatedBook = await Book.findById(book._id).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);
            socketService.emitToNamespace('/almumtaz', 'getBookCategory', populatedBook);
            console.log('Socket event emitted for new order:', book._id);
        } catch (socketError) {
            console.log('Error emitting socket event:', socketError);
        }
        
        return res.status(200).json({ status: 'ok', data: book });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




const getactivebooksuser = async (req, res) => {
    try {
        const books = await Book.find({
            userId: req.params.userId,
            assignTo: { $ne: null }, // Check if assignTo is not null
            state: { $nin: ['QuotReject', 'CancelOrder'] },
        }).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        // Calculate and update remaining warranty for WorkCompl books
        await calculateRemainingWarranty(books);

        // Fetch updated books with warranty calculation
        const updatedBooks = await Book.find({
            userId: req.params.userId,
            assignTo: { $ne: null }, // Check if assignTo is not null
            state: { $nin: ['QuotReject', 'CancelOrder'] },
            remainingWarranty: { $ne: '0' },
        }).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        return res.status(200).json({ status: 'ok', data: updatedBooks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// 2. Get all books
const getactivebooksseller = async (req, res) => {
    try {
        const books = await Book.find({
            assignTo: req.params.sellerId,
            state: { $nin: ['WorkCompl', 'QuotReject', 'CancelOrder'] },
            reClaim: false,
        }).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        // Calculate and update remaining warranty for WorkCompl books
        await calculateRemainingWarranty(books);

        // Fetch updated books with warranty calculation
        const updatedBooks = await Book.find({
            assignTo: req.params.sellerId,
            state: { $nin: ['WorkCompl', 'QuotReject', 'CancelOrder'] },
            remainingWarranty: { $ne: '0' },
            reClaim: false,
        }).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        return res.status(200).json({ status: 'ok', data: updatedBooks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// 2. Get all books
const getclaimbooksseller = async (req, res) => {
    try {
        const books = await Book.find({
            assignTo: req.params.sellerId,
            state: { $nin: ['WorkCompl', 'QuotReject'] },
            reClaim: true,
        }).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        // Calculate and update remaining warranty for WorkCompl books
        await calculateRemainingWarranty(books);

        // Fetch updated books with warranty calculation
        const updatedBooks = await Book.find({
            assignTo: req.params.sellerId,
            state: { $nin: ['WorkCompl', 'QuotReject'] },
            remainingWarranty: { $ne: '0' },
            reClaim: true,
        }).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        

        return res.status(200).json({ status: 'ok', data: updatedBooks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};







// 2. Get all books
const getcompletebooksseller = async (req, res) => {
    try {
        const books = await Book.find({
            state: 'WorkCompl',
            assignTo: req.params.sellerId
        }).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        // Calculate and update remaining warranty for WorkCompl books
        await calculateRemainingWarranty(books);

        // Fetch updated books with warranty calculation
        const updatedBooks = await Book.find({
            state: 'WorkCompl',
            assignTo: req.params.sellerId,
            remainingWarranty: { $ne: '0' }
        }).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        return res.status(200).json({ status: 'ok', data: updatedBooks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// 2. Get all books
const gethistorybooksseller = async (req, res) => {
    try {
        const books = await Book.find({
            state: 'WorkCompl',
            assignTo: req.params.sellerId,
        }).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        // Calculate and update remaining warranty for WorkCompl books
        await calculateRemainingWarranty(books);

        // Fetch updated books with warranty calculation
        const updatedBooks = await Book.find({
            state: 'WorkCompl',
            assignTo: req.params.sellerId,
        }).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        return res.status(200).json({ status: 'ok', data: updatedBooks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// 2. Get all books
const gethistorybooksuser = async (req, res) => {
    try {
        const books = await Book.find({
            state: 'WorkCompl',
            userId: req.params.userId,
        }).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        // Calculate and update remaining warranty for WorkCompl books
        await calculateRemainingWarranty(books);

        // Fetch updated books with warranty calculation
        const updatedBooks = await Book.find({
            state: 'WorkCompl',
            userId: req.params.userId,
        }).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        return res.status(200).json({ status: 'ok', data: updatedBooks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};






const calculateRemainingWarranty = async (books) => {
    const today = new Date();

    for (const book of books) {
        // Only process books with state 'WorkCompl' and valid orderCompleteDate
        if (book.state === 'WorkCompl' && book.orderCompleteDate) {
            const orderCompleteDate = new Date(book.orderCompleteDate);


            // Calculate days passed since order completion
            const differenceInTime = today.getTime() - orderCompleteDate.getTime();
            const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));


            if (differenceInDays > 0) {
                const subCategory = await SubCategory.findById(book?.subCategoryId);

                if (subCategory && subCategory.warranty) {
                    const originalWarranty = parseInt(subCategory.warranty);
                    const rem = originalWarranty - differenceInDays;


                    if (rem >= 0) {
                        await Book.findByIdAndUpdate(
                            book._id,
                            { remainingWarranty: rem.toString() },
                            { new: true }
                        );
                    } else {
                        // Set to 0 if warranty has expired
                        await Book.findByIdAndUpdate(
                            book._id,
                            { remainingWarranty: '0' },
                            { new: true }
                        );
                    }
                }
            }
        }
    }
};



const getwarrantybooksseller = async (req, res) => {
    try {
        const books = await Book.find({
            state: 'WorkCompl',
            assignTo: req.params.sellerId,
        }).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        // Calculate remaining warranty and update books
        await calculateRemainingWarranty(books);


        const newbooks = await Book.find({
            state: 'WorkCompl',
            assignTo: req.params.sellerId,
            remainingWarranty: { $ne: '0' }
        }).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);


        return res.status(200).json({ status: 'ok', data: newbooks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};











// 2. Get all books
const getbooks = async (req, res) => {
    try {
        const books = await Book.find({}).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        // Calculate and update remaining warranty for WorkCompl books
        await calculateRemainingWarranty(books);

        // Fetch updated books with warranty calculation
        const updatedBooks = await Book.find({}).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        return res.status(200).json({ status: 'ok', data: updatedBooks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};






// 2. Get all books
const getClaimbooks = async (req, res) => {
    try {
        const books = await Book.find({claimCount: { $gt: 0 }}).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        // Calculate and update remaining warranty for WorkCompl books
        await calculateRemainingWarranty(books);

        // Fetch updated books with warranty calculation
        const updatedBooks = await Book.find({claimCount: { $gt: 0 }}).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        return res.status(200).json({ status: 'ok', data: updatedBooks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};






// 2. Get all books
const getCancelbooks = async (req, res) => {
    try {
        const books = await Book.find({state: 'CancelOrder'}).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        // Calculate and update remaining warranty for WorkCompl books
        await calculateRemainingWarranty(books);

        // Fetch updated books with warranty calculation
        const updatedBooks = await Book.find({claimCount: { $gt: 0 }}).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        return res.status(200).json({ status: 'ok', data: updatedBooks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// 2. Get all books
const getbooksCategory = async (req, res) => {
    try {

        const data = await Seller.findById(req.params.sellerId);

        // Check if seller wallet balance is greater than 20
        if (!data || data.wallet <= 20) {
            return res.status(200).json({
                status: 'error',
                message: 'Insufficient wallet balance. Minimum balance required is 20.'
            });
        }

        const books = await Book.find({
            categoryId: req.params.categoryId,
            city: data?.city,
            cancelBy: { $nin: [req.params.sellerId] },
            assignTo: null
        }).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        // Calculate and update remaining warranty for WorkCompl books
        await calculateRemainingWarranty(books);

        // Fetch updated books with warranty calculation
        const updatedBooks = await Book.find({
            categoryId: req.params.categoryId,
            city: data?.city,
            cancelBy: { $nin: [req.params.sellerId] },
            assignTo: null
        }).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        return res.status(200).json({ status: 'ok', data: updatedBooks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




const deleteExpiredBooks = async (req, res) => {
    try {
        // Get current time
        const currentTime = new Date();
        // Calculate the time 5 minutes ago
        const threeMinutesAgo = new Date(currentTime - 3 * 60 * 1000);

        // Find books that meet the criteria
        const booksToDelete = await Book.find({
            assignTo: null,
            createdAt: { $lte: threeMinutesAgo } // Books created more than 5 minutes ago
        });

        // Delete the books
        await Book.deleteMany({
            _id: { $in: booksToDelete.map(book => book._id) }
        });

        booksToDelete.map(async (i) => {
            await AcceptBook.deleteOne({
                bookId: i?._id
            });
        })

        // Delete the books


        // Send response
        return res.status(200).json({ status: 'ok', message: 'Expired books deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// 3. Get book by id
const getbookById = async (req, res) => {
    try {
        const id = req.params.id;
        const books = await Book.find({ _id: id }).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        // Calculate and update remaining warranty for WorkCompl books
        await calculateRemainingWarranty(books);

        // Fetch updated book with warranty calculation
        const book = await Book.findById(id).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

        return res.status(200).json({ status: 'ok', data: book });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const cancelBook = async (req, res) => {
    try {
        const { id, sellerId } = req.params;

        // Find the book by ID
        const book = await Book.findById(id);
        if (!book) {
            return res.status(200).json({ status: 'fail', message: 'Order not found' });
        }

        // Check if the sellerId is already in the cancelBy array
        if (book.cancelBy.includes(sellerId)) {
            return res.status(200).json({ status: 'fail', message: 'You have already canceled this order' });
        }

        // Add the sellerId to the cancelBy array and save the book
        book.cancelBy.push(sellerId);
        await book.save();

        // Emit socket event for order cancellation by seller
        socketService.emitToNamespace('/almumtaz', 'orderCancelled', {
            orderId: book._id,
            sellerId: sellerId,
            cancelledBy: 'seller',
            orderState: 'CancelOrder'
        });

        return res.status(200).json({ status: 'ok', message: 'Order canceled successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




const requestBook = async (req, res) => {
    try {
        const { id, sellerId } = req.params;

        // Find the book by ID
        const book = await Book.findById(id);
        if (!book) {
            return res.status(200).json({ status: 'fail', message: 'Order not found' });
        }

        // Check if the sellerId is already in the requestBy array
        if (book.requestBy.includes(sellerId)) {
            return res.status(200).json({ status: 'fail', message: 'You have already send this order request!' });
        }


        const subCat = await SubCategory.findById(book?.subCategoryId)
        const myUser = await User.findById(book?.userId)

        sendCustomNotification('New Request', `You got new request from provider on order of ${subCat?.name}`, myUser?.token)


        // Add the sellerId to the requestBy array and save the book
        book.requestBy.push(sellerId);
        await book.save();
        await AcceptBook.create({ userId: book?.userId, sellerId: sellerId, bookId: book?._id });

        return res.status(200).json({ status: 'ok', message: 'Your request has been send to user successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};






// 4. Update book
const updatebook = async (req, res) => {
    try {
        let id = req.params.id;
        let getImage = await Book.findById(id);
        const image = req.files.image === undefined ? getImage.image : mainUrl + req.files.image[0].filename;


        const updatedbook = await Book.findByIdAndUpdate(id,
            { ...req.body, image: image, },
            { new: true });


        const subCat = await SubCategory.findById(updatedbook?.subCategoryId)
        const mySeller = await Seller.findById(updatedbook?.assignTo)
        const myUser = await User.findById(updatedbook?.userId)

        if (req.body.state === 'QuotRequest') {
            sendCustomNotification('Quotation Requested', `Quotation Requested by user of order ${subCat?.name}`, mySeller?.token)
        }

        if (req.body.state === 'QuotAccept') {
            sendCustomNotification('Quotation Accepted', `Quotation accepted by user of order ${subCat?.name}`, mySeller?.token)
        }

        if (req.body.state === 'QuotReject') {
            sendCustomNotification('Quotation Rejected', `Quotation rejected by user of order ${subCat?.name}`, mySeller?.token)
        }


        if (req.body.state === 'WorkBegin') {
            sendCustomNotification('Work Started', `Payment collected by provider and start work on order of ${subCat?.name}`, myUser?.token)
        }



        if (req.body.state === 'WorkCompl') {
            sendCustomNotification('Work Completed', `Work done by provider of order ${subCat?.name}`, myUser?.token)
        }

        if (req.body.state === 'CancelOrder') {
            sendCustomNotification('Order Cancelled', `Order cancelled for ${subCat?.name}`, myUser?.token)
            
            // Emit socket event for order cancellation
            socketService.emitToNamespace('/almumtaz', 'orderCancelled', {
                orderId: updatedbook._id,
                sellerId: updatedbook.assignTo,
                cancelledBy: 'user', // Since this is from user side
                orderState: 'CancelOrder'
            });
        }





        return res.status(200).json({ status: 'ok', data: updatedbook });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





// 4. Update book
const updatebookclaim = async (req, res) => {
    try {
        let id = req.params.id;

        const book = await Book.findById(id);
        if (!book) {
            return res.status(200).json({ status: 'fail', message: 'Order not found' });
        }

        if (book.claimCount > 0) {
            return res.status(200).json({ status: 'fail', message: 'You have already claimed this order' });
        }

        const reClaim= true
        const claimCount= 1
        const claimDate= new Date()
        const state = 'WorkBegin'

        const updatedbook = await Book.findByIdAndUpdate(id,
            { ...req.body, reClaim, claimCount, claimDate, state },
            { new: true });


        const subCat = await SubCategory.findById(updatedbook?.subCategoryId)
        const mySeller = await Seller.findById(updatedbook?.assignTo)

        sendCustomNotification('Order Claim Requested', `Order Claim Requested by seller of order ${subCat?.name}`, mySeller?.token)



        return res.status(200).json({ status: 'ok', data: updatedbook, message: 'Your order has been claimed and active.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// 4. Update book
const updateassignbookapp = async (req, res) => {
    try {
        let id = req.params.id;
        let acceptBookId = req.params.acceptBookId;


        const allacceptbook = await AcceptBook.find({ bookId: id })
        const book = await Book.findById(id)

        if (book.assignTo) {
            return
        }

        allacceptbook.map(async (i) => {
            await AcceptBook.findByIdAndDelete(i?._id);
        })




        const updatedbook = await Book.findByIdAndUpdate(id,
            { ...req.body, },
            { new: true });



        const subCat = await SubCategory.findById(updatedbook?.subCategoryId)
        const mySeller = await Seller.findById(req.body?.assignTo)

        // Check if this is an auto-acceptance (based on timing or other factors)
        const isAutoAccept = req.body?.isAutoAccept || false;
        const notificationTitle = isAutoAccept ? 'Order Auto-Accepted' : 'Order Accepted';
        const notificationBody = isAutoAccept ? 
            `Your order auto-accepted by user of ${subCat?.name} (first offer)` : 
            `Your order accepted by user of ${subCat?.name}`;

        sendCustomNotification(notificationTitle, notificationBody, mySeller?.token)


        return res.status(200).json({ status: 'ok', data: updatedbook, message: 'Your order has been assigned and active.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// 4. Update book
const updateassignbookweb = async (req, res) => {
    try {
        let id = req.params.id;


        const updatedbook = await Book.findByIdAndUpdate(id,
            { ...req.body, },
            { new: true });


        const subCat = await SubCategory.findById(updatedbook?.subCategoryId)
        const mySeller = await Seller.findById(req.body?.assignTo)

        sendCustomNotification('Order Accepted', `Order accepted by admin of ${subCat?.name} and assign to you.`, mySeller?.token)



        return res.status(200).json({ status: 'ok', data: updatedbook, message: 'Your order has been assigned and active.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};








// 5. Delete book
const deletebook = async (req, res) => {
    try {
        const id = req.params.id;
        await Book.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addbook,
    getbooks,
    getbookById,
    updatebook,
    deletebook,
    getbooksCategory,
    cancelBook,
    requestBook,
    updateassignbookapp,
    updateassignbookweb,
    getactivebooksuser,
    getactivebooksseller,
    getcompletebooksseller,
    getwarrantybooksseller,
    gethistorybooksseller,
    gethistorybooksuser,
    deleteExpiredBooks,
    updatebookclaim,
    getclaimbooksseller,
    getClaimbooks,
    getCancelbooks
};
