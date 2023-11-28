import mongoose from 'mongoose'

const chatRoom=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    hotel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hotel'
    },
    messages:[{type:mongoose.Schema.Types.ObjectId,ref:'ChatMessage'}],

})

const ChatRoom=mongoose.model('chatRoom',chatRoom)

export default ChatRoom