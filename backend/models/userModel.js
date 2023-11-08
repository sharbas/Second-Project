import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        default:null
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    profileImage: {
        type: String, // You can store the image path or a unique identifier
        // default: 'default.jpg' // Default image for new users, change as needed
    }

},{timestamps:true})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

userSchema.methods.matchPassword= async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const User=mongoose.model('User',userSchema)


export default User