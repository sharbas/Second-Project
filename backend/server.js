import express from 'express'
import dotenv from "dotenv"
dotenv.config()
import cookieParser from 'cookie-parser';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import cors from 'cors'
import connectDB from './config/db.js';
const port=process.env.PORT||5000;
import userRoutes from './routes/userRoutes.js'
import hotelRoutes from './routes/hotelRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
// import fileUpload from 'express-fileupload'
connectDB()

const app= express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())
app.use(express.static('backend/public'));

app.use('/api/users',userRoutes)
app.use('/api/hotel',hotelRoutes)
app.use('/api/admin',adminRoutes)
app.get('/',(req,res)=>res.send('Server is ready'))
// const fileUpload = require('express-fileupload');

// Add this middleware to handle file uploads
// app.use(fileUpload());

app.use(notFound)
app.use(errorHandler)
app.listen(port,()=>console.log(`Server started on port ${port}`))