const { mainUrl } = require('../config/dbConfig');
const Book = require('../models/bookModel');
const AcceptBook = require('../models/acceptBookModel');
const SubCategory = require('../models/subCategoryModel');







 
function book(io) {
    // console.log(io);
    const ticketNsp = io.of("/almumtaz")
    ticketNsp.on("connection", (socket) => {
        console.log("socket connected");

        socket.on("newBook", async (data) => {
            try {

                
                let info = {
                    id: data.id,
                }


                

                const book = await Book.findById(info?.id).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

                // await message.save()
                ticketNsp.emit("getBook",book )



            } catch (err) {
                console.log(err)
            }
        })
    })
}

module.exports = book