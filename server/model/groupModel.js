const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    
    },
    image: {
        type: Object,
        required: true,
        
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

module.exports = new mongoose.model("group",orderSchema)