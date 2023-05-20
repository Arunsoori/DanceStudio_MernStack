const mongoose = require('mongoose')

const userSchema= new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true,'user name is required']
        },
        email:{
            type: String,
            required:[true,'email is required'],
            unique:true
        },
        password:{
            type:String,
            required:[true,'password is required']
        }


    }
)
module.exports= mongoose.model("users", userSchema)