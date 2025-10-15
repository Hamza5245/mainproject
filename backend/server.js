const express = require('express')
const cors=require('cors')
const cookieParser = require('cookie-parser')
const requestIp = require('request-ip');
const bodyParser = require("body-parser");
const http = require('http');
const mongoose = require("mongoose")
const { Server } = require('socket.io');
const bookCategory = require('./socket/bookCategorySocket.js');
const acceptBookCategory = require('./socket/acceptBookSocket.js');
const book = require('./socket/bookSocket.js');
const orderCancel = require('./socket/orderCancelSocket.js');
const Admin = require('./models/adminModel.js');
const socketService = require('./services/socketService.js');


const app=express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(requestIp.mw());
app.use(bodyParser.json());

// routers (Keep your router imports here)
const sellerRouter = require('./routes/sellerRoutes.js')
// ... (All other router imports remain here)

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
        // If this fails, we log the error but don't exit the whole process, 
        // as the server might still run without this optional setup.
        console.error('Error initializing admin:', error);
    }
};

// Application Startup Logic (Single Entry Point)
const PORT=process.env.PORT || 8000
const MONGO_URI = 'mongodb://127.0.0.1:27017/almumtaz';

const startApp = async () => {
    try {
        mongoose.set('strictQuery', true);
        
        // 1. Connect to MongoDB (WAIT for success)
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connection Successful!');
        
        // 2. Initialize Admin (relies on successful connection)
        await initializeAdmin();

        // 3. Setup Routes and Middleware (Already done above)
        app.use('/almumtaz/seller',sellerRouter)
        // ... (All app.use routes remain here)
        
        // testing route
        app.get('/',(req,res)=>{
            res.json({ message:'Success'})
        })

        // 4. Create HTTP server
        const server = http.createServer(app)

        // 5. Initialize Socket.IO
        const io = new Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        })
        socketService.setSocketInstance(io);
        bookCategory(io)
        acceptBookCategory(io)
        book(io)
        orderCancel(io)

        // 6. Start listening
        server.listen(PORT,()=>{
            console.log(`Server listening on port ${PORT}`)
        })

    } catch (error) {
        console.error('FATAL STARTUP ERROR: Failed to connect to DB or set up application:', error);
        // CRITICAL: Exit the process on failure so Kubernetes can restart it cleanly.
        process.exit(1); 
    }
};

// Start the entire application
startApp();
