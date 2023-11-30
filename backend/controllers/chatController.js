import { response } from 'express'
import ChatMessage from '../models/chatMessage.js'
import ChatRoom from '../models/chatRoom.js'
import HotelDetails from '../models/hotelDetailsModel.js'


const createRoom=async(req,res)=>{
    try{
const specificHotelId=req.query.hotelId
const hotel = await HotelDetails.findOne({ _id: specificHotelId }).lean();
const hotelId = hotel ? hotel.hotelUserId : null;  

const user=req.user._id

let chatRoom=await ChatRoom.findOne({
    user:user,
    hotel:{ $eq: hotelId } 
})

if(!chatRoom){
    chatRoom=new ChatRoom({
        user:user,
        hotel:hotelId,
        messages:[],
  
    })
    await chatRoom.save()
}

const roomDetails=await ChatRoom.findOne({_id:chatRoom._id}).populate({path:'hotel',select:'_id name'})
res.status(200).json(roomDetails)

    }catch(error){
        res.status(500).json({ message: 'Error creating or getting chat room' })
    }
}




const sendChat=async(req,res)=>{
    try{
        const {content}=req.body
        const {chatid,type}=req.params
        const sender=req.user._id

        const newMessage=new ChatMessage({
            room:chatid,
            sender:sender,
            senderType:type,
            content:content,
        })
        await newMessage.save()
        let chatRoom=await ChatRoom.findOne({_id:chatid})
        if(chatRoom){
            chatRoom.messages.push(newMessage._id)
        }
        await chatRoom.save()
        
        await newMessage.populate([
            {path:'sender',select:'_id name email'},
            {path:'room',populate:[{path:'user',select:'_id name email'},{path:'hotel',select:'_id name email'}]},
        ])
res.json(newMessage);

    }catch(error){

    }
}




const getRooms=async(req,res)=>{
    try{
        const user=req.user._id
        const rooms=await ChatRoom.find({user:user}).populate({path:'hotel',select:'_id name email'})
      
            res.status(200).json(rooms)


    }catch(error){
res.status(400).json({message:'failed to fetch rooms'})
    }
}



const getHotelRooms=async(req,res)=>{
    try{
        const hotel=req.user._id
        const rooms=await ChatRoom.find({hotel:hotel}).populate({path:'user',select:'_id name email'})
        if(rooms){
            res.status(200).json(rooms)
        }else{
            res.status(400).json({messsage:'failed to fetch rooms'})
        }

    }catch(error){

    }
}


const getMessages=async(req,res)=>{
    try{
        const {roomid}=req.params
        const messages=await ChatMessage.find({room:roomid}).sort({createdAt:1})

        if(messages){
            res.status(200).json(messages)
        }else{
            res.status(404).json({message:'No messages found for the given room.'})
        }


    }catch(error){
        res.status(500).json({ message: 'Internal Server Error' });
    }
}




export {createRoom,sendChat,getRooms,getHotelRooms,getMessages}