import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema=mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            
        }

    },{timestamps:true}
)



//encrypt password using bcrypt 
adminSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password,salt)
})
//match user entered password to hashed password in database
adminSchema.methods.matchPassword= async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const Admin=mongoose.model('Admin',adminSchema)

export default Admin
