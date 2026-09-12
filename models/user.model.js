import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        minlength: [3,"Invalid,please enter valid name"]
    },
      username:{
        type:String,
        required:[true,"username is required"],
       
    },
    email:{
        type:String,
        unique: true,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:true

    },
    avatar:{
        type:String,
        default:'https://plus.unsplash.com/premium_photo-1739786995646-480d5cfd83dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlLWF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D'
    }
})

const User = mongoose.model('User',userSchema)
export default User
