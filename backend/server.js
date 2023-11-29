import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import cors from 'cors'
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js'
import hotelRoutes from './routes/hotelRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const connet= async ()=>{
    await connectDB()
}
connet()
// const io = socketIO(server);
const app = express()

app.use(cors({
    origin:["https://www.wetravels.online","https://wetravels.online"],
    credentials:true
}))
app.use(cookieParser())
app.use(express.static('backend/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/users', userRoutes)
app.use('/api/hotel', hotelRoutes)
app.use('/api/admin', adminRoutes)

// if(process.env.NODE_ENV==='production'){
    const __dirname=path.resolve()
    const dirname = (__dirname,'..')
    
    app.use(express.static(path.join(dirname,'frontend/dist')))
    app.get('*',(req,res)=>res.sendFile(path.resolve(dirname,'frontend','dist','index.html')))
// }else{

//     app.get('/', (req, res) => res.send('Server is ready'))
// }


app.use(notFound)
app.use(errorHandler)
const server=app.listen(port, () => console.log(`Server started on port ${port}`))


import {Server} from 'socket.io'

const io=new Server(server,{
    pingTimeout:60000,
    cors:{
        origin:'https://www.wetravels.online',
    },
})

io.on("connection",(socket)=>{
    console.log('connected with socket io');
    socket.on('setup',(decodedToken)=>{
        console.log(decodedToken,'qwertyu');
        if(decodedToken?.userId){
            console.log('this is decodedToken?.userId',decodedToken?.userId);
        socket.join(decodedToken?.userId)
        console.log(decodedToken?.userId);
    }else if(decodedToken?.hotelId){
        console.log('hai i am decodedToken?.hoteId',decodedToken?.hotelId);
        socket.join(decodedToken?.hotelId)
        console.log(decodedToken?.hotelId);
    }
        socket.emit('connected')
    })

    socket.on('join chat',(room)=>{
        socket.join(room)
        console.log('User joined Room'+ room);
    })

    socket.on('new message', (newMessageReceived)=>{
        var chat =newMessageReceived.room

        if(!chat.user||!chat.hotel) return console.log('chat users not defined');

        if(chat.user._id === newMessageReceived.sender._id){
            console.log(chat.user._id,'this is chat.user._id');
            socket.to(chat.hotel._id).emit("message received",newMessageReceived)
          }
      
          if(chat.hotel._id === newMessageReceived.sender._id){
            console.log(chat.user._id,'this is chat.user._id');
            socket.to(chat.user._id).emit("message received",newMessageReceived)
          }
    })
})
