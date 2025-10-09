const { mainUrl } = require('../config/dbConfig');
const Book = require('../models/bookModel');
const AcceptBook = require('../models/acceptBookModel');

function orderCancel(io) {
    console.log("Initializing orderCancel socket");
    const ticketNsp = io.of("/almumtaz")
    ticketNsp.on("connection", (socket) => {
        console.log("Socket connected to orderCancel namespace:", socket.id);

        socket.on("orderCancelled", async (data) => {
            try {
                console.log("Received orderCancelled event:", data);
                
                // Emit to all connected clients that an order has been cancelled
                // Include orderId and sellerId for identification
                ticketNsp.emit("getOrderCancelled", {
                    orderId: data.orderId,
                    sellerId: data.sellerId,
                    cancelledBy: data.cancelledBy, // 'user' or 'seller'
                    orderState: data.orderState || 'CancelOrder'
                });

                console.log("Emitted orderCancelled to all clients");

            } catch (err) {
                console.log("Error in orderCancelled:", err);
            }
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected from orderCancel namespace:", socket.id);
        });
    })
}

module.exports = orderCancel
