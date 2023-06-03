const mongoose = require('mongoose')


const facultySchema = new mongoose.Schema({
    name:{
        type:String,
        // required:true,
        
    },
    position:{
        type:String,
        // required:true
    },
    styles:{
        type:String,
        // required:true
    },
    biography:{
        type:String,
        // required:true
    },
   
    
    image_url:{
        type:String,
       
    },
    status:{
        type:Boolean,
        default:true
    }

})

module.exports = new mongoose.model("faculty",facultySchema)