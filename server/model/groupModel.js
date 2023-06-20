const mongoose = require('mongoose')


const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    
    },
    image: {
        type: Object,
        
        
    },
    members:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'users',  
    },
    description: {
        type: String,
        required:true
    },
    status: {
        type: Boolean,
        default: true,
        
    },
   
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
   
    
  

})

module.exports = new mongoose.model("group",groupSchema)