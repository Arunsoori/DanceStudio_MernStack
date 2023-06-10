const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({
    coursename:{
        type:String,
        // required:true,
        
    },
    skill:{
        type:String,
        // required:true
    },
    description:{
        type:String,
        // required:true
    },
    facultyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'faculty',
        
    
    },
    onemonthprice:{
        type:Number,
        // required:true
    },
    sixmonthprice:{
        type:Number,
        // required:true
    },
    oneyearprice:{
        type:Number,
        // required:true
    },
    
    image_url:{
        type:String,
       
    },
    status:{
        type:Boolean,
        default:true
    },
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }]
    
     

    

})

module.exports = new mongoose.model("course",courseSchema)