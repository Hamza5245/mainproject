const express = require('express')
const cors=require('cors')
const cookieParser = require('cookie-parser')
const requestIp = require('request-ip');
const bodyParser = require("body-parser");
const http = require('http');
const mongoose = require("mongoose")
const socketIO = require('socket.io');
const { Server } = require('socket.io');
const bookCategory = require('./socket/bookCategorySocket.js');
const acceptBookCategory = require('./socket/acceptBookSocket.js');
const book = require('./socket/bookSocket.js');
const orderCancel = require('./socket/orderCancelSocket.js');
const Admin = require('./models/adminModel.js');
const socketService = require('./services/socketService.js');


const app=express()

// const server = require('http').createServer(app)
// const io = require('socket.io').Server()


// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(requestIp.mw());
app.use(bodyParser.json());






mongoose.set('strictQuery', true);
mongoose.connect('mongodb://175.168.0.210:27017/almumtaz')
  .then(() => console.log('Connection Successfull!'))
  .catch((err)=>console.log(err));




const connectMongoDB = async() => {
    try{
        const conn = await mongoose.connect('mongodb://175.168.0.210:27017/almumtaz')
        console.log("Successfully Connected")
    }catch(error){
        console.log('Error in connecting DataBase ${error}.bgRed.white')
    }
}

// Function to initialize admin
const initializeAdmin = async () => {
    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });

        if (!existingAdmin) {
            // Create new admin with specified credentials
            const newAdmin = new Admin({
                email: 'admin@gmail.com',
                password: 'admin',
                wallet: 0
            });

            await newAdmin.save();
            console.log('Admin created successfully with email: admin@gmail.com');
        } else {
            console.log('Admin already exists with email: admin@gmail.com');
        }
    } catch (error) {
        console.error('Error initializing admin:', error);
    }
};

connectMongoDB()

// Initialize admin after database connection
initializeAdmin();





// const server = http.createServer(app);
// const io = socketIO(server);


// routers
const sellerRouter = require('./routes/sellerRoutes.js')
const verifyRouter = require('./routes/verifyRoutes.js')
const sliderRouter = require('./routes/sliderRoutes.js')
const acceptBookRouter = require('./routes/acceptBookRoutes.js')
const bookRouter = require('./routes/bookRoutes.js')
const quotationRouter = require('./routes/quotationRoutes.js')
const notificationRouter = require('./routes/notificationRoutes.js')
const ratingRouter = require('./routes/ratingRoutes.js')
const serviceRouter = require('./routes/serviceRoutes.js')
const categoryRouter = require('./routes/categoryRoutes.js')
const subCategoryRouter = require('./routes/subCategoryRoutes.js')
const countryRouter = require('./routes/countryRoutes.js')
const cityRouter = require('./routes/cityRoutes.js')
const taxRouter = require('./routes/taxRoutes.js')
const userRouter = require('./routes/userRoutes.js')
const loginRouter = require('./routes/loginRoutes.js');
const couponRouter = require('./routes/couponRoutes.js');
const walletRouter = require('./routes/walletRoutes.js');
const topupRouter = require('./routes/topupRoutes.js');
const { url } = require('./config/dbConfig.js');










app.use('/almumtaz/seller',sellerRouter)
app.use('/almumtaz/verify',verifyRouter)
app.use('/almumtaz/slider',sliderRouter)
app.use('/almumtaz/acceptBook',acceptBookRouter)
app.use('/almumtaz/book',bookRouter)
app.use('/almumtaz/quotation',quotationRouter)
app.use('/almumtaz/notification',notificationRouter)
app.use('/almumtaz/rating',ratingRouter)
app.use('/almumtaz/category',categoryRouter)
app.use('/almumtaz/subCategory',subCategoryRouter)
app.use('/almumtaz/country',countryRouter)
app.use('/almumtaz/city',cityRouter)
app.use('/almumtaz/tax',taxRouter)
app.use('/almumtaz/user',userRouter)
app.use('/almumtaz/service',serviceRouter)
app.use('/almumtaz/login',loginRouter)
app.use('/almumtaz/coupon',couponRouter)
app.use('/almumtaz/wallet',walletRouter)
app.use('/almumtaz/topup',topupRouter)






app.use(express.static(__dirname + '/Images'))




// testing
app.get('/',(req,res)=>{
    res.json({ message:'Success'})
})


const PORT=process.env.PORT || 8000

// Create HTTP server
const server = require('http').createServer(app)

// Initialize Socket.IO with the server
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

// Set socket instance in service
socketService.setSocketInstance(io);

// Start both API and Socket server on the same port
server.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})

// Initialize socket namespaces
bookCategory(io)
acceptBookCategory(io)
book(io)
orderCancel(io)
