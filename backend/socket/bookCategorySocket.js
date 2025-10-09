const { mainUrl } = require('../config/dbConfig');
const Book = require('../models/bookModel');
const AcceptBook = require('../models/acceptBookModel');
const SubCategory = require('../models/subCategoryModel');







 
function bookCategory(io) {
    console.log("Initializing bookCategory socket");
    const ticketNsp = io.of("/almumtaz")
    ticketNsp.on("connection", (socket) => {
        console.log("Socket connected to bookCategory namespace:", socket.id);

        socket.on("newBookCategory", async (data) => {
            try {
                console.log("Received newBookCategory event:", data);
                
                let info = {
                    categoryId: data.categoryId,
                }

                const books = await Book.findById(info.categoryId).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

                if (books) {
                    console.log("Emitting getBookCategory to all connected clients:", books._id);
                    ticketNsp.emit("getBookCategory", books);
                } else {
                    console.log("No book found with ID:", info.categoryId);
                }

            } catch (err) {
                console.log("Error in newBookCategory:", err);
            }
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected from bookCategory namespace:", socket.id);
        });
    })
}

module.exports = bookCategory