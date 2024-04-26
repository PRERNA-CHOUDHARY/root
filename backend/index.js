import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './Routes/auth.js'
import userRoutes from './Routes/user.js';
import doctorRoutes from './Routes/doctor.js'
import reviewRoute from './Routes/review.js';
import bookingRoute from './Routes/booking.js';
dotenv.config()

const app = express()
const port = process.env.PORT || 6000

const corsOptions = {
    origin: true,
}
// database connection

mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected to DB")
        

    }
    catch (err){
        console.log("Failed to connect to DB")
    }
};

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/doctors',doctorRoutes)
app.use('/api/v1/reviews',reviewRoute)
app.use('/api/v1/bookings',bookingRoute)
app.get('/', (req, res) => {
    res.send("API is Working");
})


app.listen(port, () => {
    connectDB();
    console.log(`Server running on port ${port}`)
})