const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

        },
        enrolledCouseId:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'course'
        }],
        image_url:{
            type:String,
           
        }


    }
)

userSchema.pre('save',async function (next){
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    const salt=await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

module.exports= mongoose.model("users", userSchema)