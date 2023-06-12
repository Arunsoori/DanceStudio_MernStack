const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref: 'users'
        
    },
    courseId:{
        type:mongoose.Types.ObjectId,
        ref: 'course'
        // required:true
    },
    orderdate:{
        type:Date,

        // required:true
    },
    status:{
        type: Boolean,
        default:true
    },
   
    
  

})

module.exports = new mongoose.model("order",orderSchema)