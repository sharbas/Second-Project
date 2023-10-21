import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const hotelSchema=mongoose.Schema({
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
        required:true,
    },
    otp:{
        type:Number,
        default:null
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
})

//Match user entered password to hashed password in database
hotelSchema.methods.matchPassword=async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

hotelSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

const Hotel=mongoose.model('Hotel',hotelSchema)

export default Hotel